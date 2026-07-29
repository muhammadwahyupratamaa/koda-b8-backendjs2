import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "sticky Notes API",
  });
});

export default router;
