import sql from "mssql"

// Change these to match your SQL Server, or set them as environment variables
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: "localhost",
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
}

let pool

export const getConnection = async () => {
    if (!pool) pool = await sql.connect(config)
    return pool
}

export { sql }
