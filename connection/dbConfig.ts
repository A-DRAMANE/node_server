export const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: `${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
};