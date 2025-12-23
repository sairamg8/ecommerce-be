import e from "express";
import dotenv from "dotenv";
import health_route from "./routes/health";
import Auth_Route from "./routes/auth";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const server = e();
const port = process.env.APP_PORT;

server.use(e.json());
server.use(e.urlencoded({ extended: false }));
server.use("/health", health_route);
server.use("/auth", Auth_Route);

// Not Found Error
server.use((req, res, next) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
server.use(errorHandler);

connectDB().then(() =>
  server.listen(port, () => console.log(`Server Started on ${port}`))
);
