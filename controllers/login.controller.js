import {getConnection, sql} from "../utils/database.js"

export const login = async (req, res) => {
    const {username, password} = req.body
    const pool = await getConnection()
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .query('SELECT * FROM Users WHERE username = @username AND password = @password')
    if (result.recordset.length > 0) {
        res.status(200).json({login: true, message: "Login successful", user: result.recordset[0]})
    } else {
        res.status(401).json({login: false, message: "Invalid username or password"})
    }
}
