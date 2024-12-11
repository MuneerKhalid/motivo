import express from "express";
import {
  createCategory,
  getCategoriesBySignedUser,
  deleteCategory,
} from "../Controller/CategoryController";

const router = express.Router();

router.post("/create", createCategory);
router.get("/currentUser", getCategoriesBySignedUser);
router.delete("/delete/:categoryId", deleteCategory);

export default router;
