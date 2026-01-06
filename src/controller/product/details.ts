import { DetailsService } from "@/services/product/details/details_service";
import { Request, Response, NextFunction } from "express";

export const DetailsController = {
  async getDetails(req: Request, res: Response) {
    const { identifier } = req.params as { identifier: string | number };

    const details = await DetailsService.getDetails(identifier);

    res.json(details);
  },
};
