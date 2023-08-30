import * as oracledb from 'oracledb';
import { dbConfig } from '../connection/dbConfig';
import { Assurance } from '../interfaces/assurances/assurance.interface';
import { responseData } from '../interfaces';
import { ASSURANCES } from '../constants/tables';
import responseFormat from '../constants/responseFormat';

export const findAll = async (): Promise<responseData | undefined> => {
    try {
        const connection = await oracledb.getConnection(dbConfig);

        // Configuration pour obtenir un résultat avec les noms de colonnes
        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
        const result = await connection.execute<Assurance>(`SELECT * FROM ${ASSURANCES} order by DATE_INSERT desc`,[],options);
        await connection.close();

        return responseFormat({datas:result.rows});
        } catch (error) {
        console.error("Erreur :", error);
        return responseFormat({statut:false, message: 'Erreur lors de la récupération des données'})
    }
};

export const find = async (id:string): Promise<responseData | undefined> => {
    try {
        const connection = await oracledb.getConnection(dbConfig);

        // Configuration pour obtenir un résultat avec les noms de colonnes
        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
        const result = await connection.execute<Assurance>(`SELECT * FROM ${ASSURANCES} WHERE NUM_POLICE_ASSURANCE='${id}'`,[],options);
        await connection.close();

        return responseFormat({datas:result.rows});
        } catch (error) {
        console.error("Erreur :", error);
        return responseFormat({statut:false, message: 'Erreur lors de la récupération de l\'élément: '+id});
    }
};

export const create = async (assurance:Assurance): Promise<responseData | undefined> => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const insertQuery = `
        INSERT INTO ${ASSURANCES} (NUM_POLICE_ASSURANCE, DATE_EFFET, DATE_ECHEANCE, DESTINATION, VILLE, OBSERVATION, MONTANT, ID_USER, NUM_VEHI, NUM_MARCHE, MATRI_EMP, MATRI_FSSEUR, NUM_TYPE) 
        VALUES ('${assurance.NUM_POLICE_ASSURANCE}', 
        '${assurance.DATE_EFFET}', 
        '${assurance.DATE_ECHEANCE}', 
        ${assurance.DESTINATION?''+assurance.DESTINATION+'':null}, 
        ${assurance.VILLE?''+assurance.VILLE+'':null}, 
        '${assurance.OBSERVATION}', 
        ${assurance.MONTANT}, 
        '${assurance.ID_USER}', 
        ${assurance.NUM_VEHI?''+assurance.NUM_VEHI+'':null}, 
        '${assurance.NUM_MARCHE}', 
        ${assurance.MATRI_EMP?''+assurance.MATRI_EMP+'':null}, 
        ${assurance.MATRI_FSSEUR}, 
        ${assurance.NUM_TYPE})`;
        
        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
        const result = await connection.execute<Assurance>(insertQuery,[],options);

        await connection.commit();
        await connection.close();

        const response = await find(assurance.NUM_POLICE_ASSURANCE)
        return responseFormat({datas:response?.datas,message: "Nouvel élément inséré avec succès"});
    } catch (error) {
        console.error("Erreur :", error);
        return responseFormat({statut:false, message: 'Erreur lors de l\'insertion.'});
    }
};