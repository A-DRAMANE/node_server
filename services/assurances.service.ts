import * as oracledb from 'oracledb';
import { dbConfig } from '../connection/dbConfig';
import { Assurance } from '../interfaces/assurances/assurance.interface';
import { responseData, responseObjet } from '../interfaces';

export const findAll = async (): Promise<responseData | undefined> => {
    try {
        const connection = await oracledb.getConnection(dbConfig);

        // Configuration pour obtenir un résultat avec les noms de colonnes
        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
        const result = await connection.execute<Assurance>("SELECT * FROM ASSURANCES",[],options);
        await connection.close();

        return {datas:result.rows,statut:true};
        } catch (error) {
        console.error("Erreur :", error);
        return { statut:false, message: 'Erreur lors de la récupération des données' }
    }
};

export const find = async (id:string): Promise<responseData | undefined> => {
    try {
        const connection = await oracledb.getConnection(dbConfig);

        // Configuration pour obtenir un résultat avec les noms de colonnes
        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
        const result = await connection.execute<Assurance>("SELECT * FROM ASSURANCES WHERE NUM_POLICE_ASSURANCE="+id,[],options);
        await connection.close();

        return {datas:result.rows,statut:true};
        } catch (error) {
        console.error("Erreur :", error);
        return { statut:false, message: 'Erreur lors de la récupération des données' }
    }
};