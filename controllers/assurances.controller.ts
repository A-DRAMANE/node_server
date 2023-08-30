/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import * as AssuranceService from '../services/assurances.service';
import { responseData } from "../interfaces";

export const getAllAssuranceController = async (req: Request, res: Response) => {
  const allAssurances: responseData | undefined = await AssuranceService.findAll();
  if (allAssurances?.statut) {
    res.json(allAssurances)
  }else{
    res.status(500).json(allAssurances?.message);
  }
}

export const getIdAssuranceController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  // res.json(id)
  const allAssurances: responseData | undefined = await AssuranceService.find(id);
  if (allAssurances?.statut) {
    res.json(allAssurances)
  }else{
    res.status(500).json(allAssurances?.message);
  }
}