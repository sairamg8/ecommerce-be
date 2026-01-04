import e from "express";
import dotenv from "dotenv";
import health_route from "./routes/health";
import Auth_Route from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";
import Category_Route from "./routes/category";
import { initializeAssociations } from "./db/models/associations";
import ProductRouter from "./routes/product";
import { Authenticate } from "./middleware/auth.middleware";
import Cart_Route from "./routes/cart";
import User_Route from "./routes/user";

initializeAssociations();

dotenv.config();

const server = e();
const port = process.env.APP_PORT;

server.use(e.json());
server.use(e.urlencoded({ extended: false }));
server.use("/health", health_route);
server.use("/auth", Auth_Route);
server.use("/categories", Authenticate, Category_Route);
server.use("/products", Authenticate, ProductRouter);
server.use("/cart", Authenticate, Cart_Route);
server.use("/user", Authenticate, User_Route);

// Not Found Error
server.use((req, res, next) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
server.use(errorHandler);

server.listen(port, () => console.log(`Server Started on ${port}`));
