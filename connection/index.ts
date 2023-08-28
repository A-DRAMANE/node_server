const oracledb = require('oracledb');
export let connection:any;


export async function run() {
    try {
        await oracledb.createPool({
            user          : process.env.ORACLE_USER,
            password      : process.env.ORACLE_PASSWORD,
            connectString : `${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        });

        let result;
        try {
            // get connection from the pool and use it
            connection = await oracledb.getConnection();
            result = await connection.execute(`SELECT * FROM Assurances`);
            console.log("Result is:", result);
        } catch (err) {
            throw (err);
        } finally {
            if (connection) {
                try {
                    await connection.close(); // Put the connection back in the pool
                } catch (err) {
                    throw (err);
                }
            }
        }
    } catch (err:any) {
        console.error(err.message);
    } finally {
        await oracledb.getPool().close(0);
    }
}

run();