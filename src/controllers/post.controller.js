import { pool } from "../db.js";

// busca todos los posts por id del usuario
export const getPosts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM post WHERE user_id = ? ORDER BY id DESC',
        [req.params.id])
        //const [rows] = await pool.query('SELECT * FROM post')
        //res.send({ rows })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

// Filtra los posts por estado
export const filterPosts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM post WHERE user_id = ? AND status = ? ORDER BY id DESC',
        [req.params.id, req.params.status])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}


// trae un solo post para ver, editar.
export const getPost = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM post WHERE id = ?',
            [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Post not found'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//agrega nuevo post
export const createPost = async (req, res) => {
    const { user_id, post, created_at, status, social_media, post_time } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO post (user_id, post, created_at, status, social_media, post_time) VALUES(?,?,?,?,?,?)',
            [user_id, post, created_at, status, social_media, post_time])
        res.send({
            id: rows.insertId,
            user_id,
            post,
            created_at,
            status,
            social_media,
            post_time
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//actualiza posts que no han sido publicados
export const updatePost = async (req, res) => {
    const { id } = req.params
    const { post, post_time } = req.body
    try {
        const [result] = await pool.query
            ('UPDATE post SET post = IFNULL(?, post), post_tirme = IFNULL(?, post_time) WHERE id = ?',
                [post, post_time, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Post not found'
        })
        const [rows] = await pool.query('SELECT * FROM post WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

// elimina un posts
export const deletePost = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM post WHERE id = ?',
            [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Post not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}


