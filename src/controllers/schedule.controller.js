import { pool } from "../db.js";

// busca todos los schedules por id del usuario

export const getSchedules = async (req, res) => {
    const user_id=[req.params.id];
    const day=[req.params.day];
    try {
        const [rows] = await pool.query(`SELECT * FROM ${day} WHERE user_id = ? ORDER BY time ASC`,
        user_id)
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

//agrega nuevo schedule
export const createSchedule = async (req, res) => {
    const {user_id, day, time} = req.body;
    try {
        const [rows] = await pool.query( ` INSERT INTO ${day} (user_id, time) VALUES(?,?)`,
            [user_id, time])
        res.send({
            id: rows.insertId,
            user_id,
            day,
            time
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

// elimina un schedule
export const deleteSchedule = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM schedule WHERE id = ?',
            [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Schedule not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}


