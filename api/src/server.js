require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// --- helpers ---
function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "2d",
  });
}

function auth(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
      return res
        .status(401)
        .json({ error: { code: "UNAUTHORIZED", message: "No token" } });
    }
    const token = header.split(" ")[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      if (requiredRole && payload.role !== requiredRole) {
        return res
          .status(403)
          .json({ error: { code: "FORBIDDEN", message: "Not allowed" } });
      }
      next();
    } catch {
      return res
        .status(401)
        .json({ error: { code: "INVALID_TOKEN", message: "Invalid token" } });
    }
  };
}

// --- validation schemas ---
const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// --- ROUTES ---

// Register (patient)
app.post("/api/register", async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: "Invalid input" } });
  }

  const { name, email, password } = parsed.data;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hash, role: "patient" },
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        error: { code: "EMAIL_TAKEN", message: "Email already exists" },
      });
    }
    res
      .status(500)
      .json({ error: { code: "SERVER_ERROR", message: "Failed to register" } });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: "Invalid input" } });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({
      error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
    });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({
      error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
    });
  }

  const token = signToken(user);
  res.json({ token, role: user.role, name: user.name });
});

// Get available slots
app.get("/api/slots", auth("patient"), async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) {
    return res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: "from/to required" } });
  }

  const slots = await prisma.slot.findMany({
    where: {
      startAt: { gte: new Date(from) },
      endAt: { lte: new Date(to) },
    },
    orderBy: { startAt: "asc" },
    include: { bookings: true },
  });

  // return only slots not booked
  const available = slots.filter((s) => s.bookings.length === 0);
  res.json(available);
});

// Book a slot
app.post("/api/book", auth("patient"), async (req, res) => {
  const { slotId } = req.body;
  if (!slotId) {
    return res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: "slotId required" } });
  }
  try {
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.sub,
        slotId,
      },
    });
    res.status(201).json(booking);
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(400).json({
        error: { code: "SLOT_TAKEN", message: "Slot already booked" },
      });
    }
    res
      .status(500)
      .json({ error: { code: "SERVER_ERROR", message: "Failed to book slot" } });
  }
});

// Get my bookings (patient)
app.get("/api/my-bookings", auth("patient"), async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: req.user.sub },
    include: { slot: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(bookings);
});

// Get all bookings (admin)
app.get("/api/all-bookings", auth("admin"), async (req, res) => {
  const bookings = await prisma.booking.findMany({
    include: { slot: true, user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(bookings);
});

// test route
app.get("/api/health", (req, res) => res.json({ ok: true }));

// start server
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`✅ API running on http://localhost:${port}`)
);
