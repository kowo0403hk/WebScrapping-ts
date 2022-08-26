import * as types from "../types";
import express, { Request, Response, IRouter } from "express";
import {
  getDentrix,
  dentrixCleanUp,
  initialDentrixUrl,
} from "../helpers/dentrix";
import {
  getDentalXChange,
  dentalXChangeCleanup,
  initialDentalXChangeUrl,
} from "../helpers/dentalXChange";

const router = express.Router();

const scrapperRouter = (): IRouter => {
  // get all data from dentrix and dentalXChange
  router.get("/", async (req: Request, res: Response) => {
    //get data from dentrix and dentalXChange

    await Promise.all([
      getDentrix(initialDentrixUrl),
      getDentalXChange(initialDentalXChangeUrl),
    ]).then((values: any) => {
      dentrixCleanUp();
      dentalXChangeCleanup();
      res.status(200).json({ dentrix: values[0], dentalXChange: values[1] });
    });
  });

  return router;
};

export default scrapperRouter;
