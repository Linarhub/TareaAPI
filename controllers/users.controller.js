import { getConnection, sql } from "../utils/db.js"

export const getUsers = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT * FROM Users')
    res.json(result.recordset)
}

export const getUserById = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('SELECT * FROM Users WHERE id = @id')
    res.json(result.recordset[0])
}

export const postUser = async (req, res) => {
    const {name, age, points, username, password} = req.body
    const pool = await getConnection()
    const result = await pool.request()
        .input('name', sql.VarChar, name)
        .input('age', sql.Int, age)
        .input('points', sql.Int, points)
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .query('INSERT INTO Users (name, age, points, username, password) VALUES (@name, @age, @points, @username, @password)')
    res.json(result)
}

export const putUser = async (req, res) => {
    const {name, age, points, username, password} = req.body
    const id = req.params.id
    const pool = await getConnection()
    const result = await pool.request()
        .input('name', sql.VarChar, name)
        .input('age', sql.Int, age)
        .input('points', sql.Int, points)
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .input('id', sql.Int, id)
        .query('UPDATE Users SET name = @name, age = @age, points = @points, username = @username, password = @password WHERE id = @id')
    res.json(result)
}
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const pool = await getConnection()
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Users WHERE id = @id')
    res.json(result)
}
