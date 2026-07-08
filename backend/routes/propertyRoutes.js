import express from "express";
import { buyProperty, fetchProperties } from "../controllers/propertyController.js";

const router = express.Router();

router.post("/property/buy", buyProperty);
router.get("/properties", fetchProperties);

export default router;
