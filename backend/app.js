import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();

// Routers
import UserRouter from './routers/user.router.js';
import CategoryRouter from './routers/category.router.js';
import ContactRouter from './routers/contact.router.js';
import AlertRouter from './routers/alerts.router.js';
import FormRouter from './routers/form.router.js';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// CORS config
app.use(
  cors({
    origin: "https://oyefill.vercel.app", // no trailing slash
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["content-type", "Authorization"],
  })
);

// Routes
app.use("/user", UserRouter);
app.use("/contact", ContactRouter);
app.use("/category", CategoryRouter);
app.use("/alert", AlertRouter);
app.use("/forms", FormRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Oyefill backend is running");
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
