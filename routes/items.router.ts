/**
 * Required External Modules and Interfaces
 */
import express from "express";
import { delItemController, getIdItemController, getItemController, postItemController, putItemController } from "../controllers/items.controller";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", getItemController);

// GET items/:id
itemsRouter.get("/:id", getIdItemController);

// POST items
itemsRouter.post("/", postItemController);

// PUT items/:id
itemsRouter.put("/:id", putItemController);

// DELETE items/:id
itemsRouter.delete("/:id",delItemController);