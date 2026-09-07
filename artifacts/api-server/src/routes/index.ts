import { Router, type IRouter } from "express";
import healthRouter from "./health";
import libraryRouter from "./library";

const router: IRouter = Router();

router.use(healthRouter);
router.use(libraryRouter);

export default router;
