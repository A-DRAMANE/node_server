/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import * as AssuranceService from '../services/assurances.service';
import { responseData } from "../interfaces";
import { Assurance } from "../interfaces/assurances/assurance.interface";

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
  const allAssurances: responseData | undefined = await AssuranceService.find(id);
  if (allAssurances?.statut) {
    res.json(allAssurances)
  }else{
    res.status(500).json(allAssurances);
  }
}

export const createAssuranceController = async (req: Request, res: Response) => {
  const newAssurance: Assurance = req.body;
  // res.json(req.body);
  
  const allAssurances: responseData | undefined = await AssuranceService.create(newAssurance);
  if (allAssurances?.statut) {
    res.json(allAssurances)
  }else{
    res.status(500).json(allAssurances);
  }
}