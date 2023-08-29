import * as oracledb from 'oracledb';
import { dbConfig } from "./dbConfig";

// Établir une connexion à la base de données
oracledb.getConnection(dbConfig, (err, connection) => {
    if (err) {
        console.error("Erreur de connexion :", err);
        return;
    }

    // Votre code pour exécuter des requêtes ici
    connection.execute(
        "SELECT * FROM ma_table",
        [],
        (err, result) => {
            if (err) {
                console.error("Erreur d'exécution de la requête :", err);
                return;
            }
            console.log(result.rows);
        }
    );

    // Fermer la connexion lorsque vous avez terminé
    connection.close((err) => {
        if (err) {
            console.error("Erreur lors de la fermeture de la connexion :", err);
        }
    });
});