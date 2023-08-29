import * as oracledb from 'oracledb';
import { dbConfig } from '../connection/dbConfig';
import { Assurance } from '../interfaces/assurances/assurance.interface';
oracledb.initOracleClient({ libDir: 'D:/instantclient_19_20' });

export const findAll = async (): Promise<any> => {
    // Établir une connexion à la base de données
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error("Erreur de connexion :", err);
            return "Erreur de connexion :"+ err;
        }

        // Votre code pour exécuter des requêtes ici
        connection.execute<Assurance>(
            "SELECT * FROM ASSURANCES",
            [],
            (err, result) => {
                if (err) {
                    console.error("Erreur d'exécution de la requête :", err);
                    return "Erreur d'exécution de la requête : "+ err;
                }
                return result.rows;
            }
        );

        // Fermer la connexion lorsque vous avez terminé
        connection.close((err) => {
            if (err) {
                console.error("Erreur lors de la fermeture de la connexion :", err);
            }
        });
    });
};