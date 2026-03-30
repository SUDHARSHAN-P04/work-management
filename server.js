require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/db");
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "work-management-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 4
    }
  })
);

app.use(async (req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.errorMessage = req.session.errorMessage || null;
  res.locals.successMessage = req.session.successMessage || null;
  req.session.errorMessage = null;
  req.session.successMessage = null;
  next();
});

app.get("/", async (req, res) => {
  if (req.session.user) {
    return res.redirect(
      req.session.user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
    );
  }

  const workerCount = await User.countDocuments({ role: "worker" });
  res.render("index", { workerCount });
});

app.use("/", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
