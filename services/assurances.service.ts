import * as oracledb from 'oracledb';
import { dbConfig } from '../connection/dbConfig';
import { Assurance, BaseAssurance } from '../interfaces/assurances/assurance.interface';
import { responseData } from '../interfaces';
import { ASSURANCES } from '../constants/tables';
import responseFormat from '../constants/responseFormat';
import * as codes from '../constants/codes'

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
        const message:string | undefined = result.rows && result?.rows?.length==0?"Nous n'avons pas trouvez d'élément correspondant à: "+id:undefined;
        const statut:boolean = !(result.rows && result?.rows?.length==0);
        
        return responseFormat({datas:result.rows,message:message,statut:statut,code:statut?codes.success:codes.noData});
        } catch (error) {
        console.error("Erreur find :", error);
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
        return responseFormat({datas:response?.datas,message: "Nouvel élément inséré avec succès",code:codes.create});
    } catch (error) {
        console.error("Erreur :", error);
        return responseFormat({statut:false, message: 'Erreur lors de l\'insertion.'});
    }
};

export const update = async (id:string,assurance:BaseAssurance): Promise<responseData | undefined> => {
    try {
        const targetItem = await find(id)
        if (targetItem?.statut && targetItem.datas) {
            const connection = await oracledb.getConnection(dbConfig);
            const insertQuery = `
            UPDATE ${ASSURANCES} SET
                DATE_EFFET='${assurance?.DATE_EFFET?''+assurance?.DATE_EFFET+'':targetItem.datas[0].DATE_ECHEANCE}', 
                DATE_ECHEANCE='${assurance?.DATE_ECHEANCE?''+assurance?.DATE_ECHEANCE+'':targetItem.datas[0].DATE_ECHEANCE}', 
                DESTINATION=${assurance?.DESTINATION?''+assurance?.DESTINATION+'':targetItem.datas[0].DESTINATION}, 
                VILLE=${assurance?.VILLE?''+assurance?.VILLE+'':targetItem.datas[0].VILLE}, 
                OBSERVATION='${assurance?.OBSERVATION?''+assurance?.OBSERVATION+'':targetItem.datas[0].OBSERVATION}', 
                MONTANT=${assurance?.MONTANT?''+assurance?.MONTANT+'':targetItem.datas[0].MONTANT}, 
                ID_USER='${assurance?.ID_USER?''+assurance?.ID_USER+'':targetItem.datas[0].ID_USER}', 
                NUM_VEHI=${assurance?.NUM_VEHI?''+assurance?.NUM_VEHI+'':targetItem.datas[0].NUM_VEHI}, 
                NUM_MARCHE='${assurance?.NUM_MARCHE?''+assurance?.NUM_MARCHE+'':targetItem.datas[0].NUM_MARCHE}', 
                MATRI_EMP=${assurance?.MATRI_EMP?''+assurance?.MATRI_EMP+'':targetItem.datas[0].MATRI_EMP}, 
                MATRI_FSSEUR=${assurance?.MATRI_FSSEUR?''+assurance?.MATRI_FSSEUR+'':targetItem.datas[0].MATRI_FSSEUR}, 
                IS_ACTIVE=${assurance?.IS_ACTIVE?''+assurance?.IS_ACTIVE+'':targetItem.datas[0].IS_ACTIVE}, 
                UPDATE_USER=${assurance?.UPDATE_USER?''+assurance?.UPDATE_USER+'':targetItem.datas[0].UPDATE_USER}, 
                UPDATE_DATE=${assurance?.UPDATE_DATE?''+assurance?.UPDATE_DATE+'':targetItem.datas[0].UPDATE_DATE}, 
                RUPTURE_USER=${assurance?.RUPTURE_USER?''+assurance?.RUPTURE_USER+'':targetItem.datas[0].RUPTURE_USER},  
                RUPTURE_DATE=${assurance?.RUPTURE_DATE?''+assurance?.RUPTURE_DATE+'':targetItem.datas[0].RUPTURE_DATE}, 
                USER_VALIDATE=${assurance?.USER_VALIDATE?''+assurance?.USER_VALIDATE+'':targetItem.datas[0].USER_VALIDATE}, 
                VALIDATE_DATE=${assurance?.VALIDATE_DATE?''+assurance?.VALIDATE_DATE+'':targetItem.datas[0].VALIDATE_DATE} 
            WHERE NUM_POLICE_ASSURANCE='${id}'`;
            
            const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
            const result = await connection.execute<Assurance>(insertQuery,[],options);
    
            await connection.commit();
            await connection.close();
    
            const response = await find(id)
            return responseFormat({datas:response?.datas,message: "Modification éffectuer avec succès",code:codes.success});
        }else{
            return responseFormat({statut:false, message: targetItem?.message+', Assurance introuvable.',code:targetItem?.code});
        }
    } catch (error) {
        console.error("Erreur update :", error);
        return responseFormat({statut:false, message: 'Erreur lors de la modification.'});
    }
};

export const deleteId = async (id:string): Promise<responseData | undefined> => {
    try {
        const connection = await oracledb.getConnection(dbConfig);

        // Configuration pour obtenir un résultat avec les noms de colonnes
        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
        const result = await connection.execute<Assurance>(`DELETE ${ASSURANCES} WHERE NUM_POLICE_ASSURANCE='${id}'`,[],options);
        await connection.commit();
        await connection.close();
        const response = await findAll();
        return responseFormat({datas:response?.datas,message: "Modification éffectuer avec succès",code:codes.success});
        } catch (error) {
        console.error("Erreur find :", error);
        return responseFormat({statut:false, message: 'Erreur lors de la récupération de l\'élément: '+id});
    }
};