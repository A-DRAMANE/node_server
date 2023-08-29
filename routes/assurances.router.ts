/**
 * Required External Modules and Interfaces
 */
import express from "express";
import { getAllAssuranceController, getIdAssuranceController } from "../controllers/assurances.controller";

/**
 * Router Definition
 */
export const assuranceRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
assuranceRouter.get("/", getAllAssuranceController);

// GET items/:id
assuranceRouter.get("/:id", getIdAssuranceController);