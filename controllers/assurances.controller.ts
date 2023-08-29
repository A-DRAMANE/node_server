/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
// import * as AssuranceService from "../services/assurances.service";
import { BaseItem, Item  } from "../interfaces/items/item.interface";  
import * as oracledb from 'oracledb';
import { dbConfig } from "../connection/dbConfig";
import { Assurance } from "../interfaces/assurances/assurance.interface";
import { Assurances } from "../interfaces/assurances/assurances.interface";

oracledb.initOracleClient({ libDir: 'D:/instantclient_19_20' });

export const getAllAssuranceController = async (req: Request, res: Response) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    // Configuration pour obtenir un résultat avec les noms de colonnes
    const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
    const result = await connection.execute<Assurances>("SELECT * FROM ASSURANCES",[],options);
    
    // Fermer la connexion
    await connection.close();

    // Renvoyer les résultats en JSON
    // result.rows[0]
    res.json(result.rows);
  } catch (error) {
      console.error("Erreur :", error);
      res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
}