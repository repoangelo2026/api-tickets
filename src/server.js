// Importación de módulos nativos de Node.js
import express from "express";
import path from "node:path";
import ticketsRouter from "./routes/tickets.js";
import { tickets } from "./data/tickets.js";

// Puerto en el que escuchará el servidor.
const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware - Trae los http en JSON
app.use(express.json());

// Middleware - Trae los http y url
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Vistas EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

// Salud del servicio
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Vista de tickets
app.get("/", (req, res) => res.render("index", { tickets }));

// Vista detalle de un ticket
app.get("/tickets/:id/ver", (req, res) => {
  const ticket = tickets.find((t) => t.id === Number(req.params.id));
  res.render("detalle", { ticket });
});

// API JSON
app.use("/tickets", ticketsRouter);

//Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Algo salió mal",
  });
});

//Iniciar el servidor en el puerto especificado.
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
