import { Request, Response } from "express";

const health_controller = (req: Request, res: Response) => {
  res.send("OK");
};

export { health_controller };
