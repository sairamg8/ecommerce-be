import { health_controller } from "@/services/health.controller";
import e from "express";

const health_route = e.Router();

health_route.get("/", health_controller);

export default health_route;
