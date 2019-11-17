// eslint-disable-next-line new-cap
import { Router } from "express";
import { connection as db } from "../db"

export const router = Router()

router.post("/conversations", async (req: any, res: any) => {
    const sql = `SELECT * FROM conversetion WHERE user1_id= "?" OR user2_id= "?"`
    db.query(sql, [req.user, req.user], async (err: any, result: any) => {
        if (err) res.json(err)
        result = result.map((json: any) => json["user1_id"] == req.user ? json["user2_id"] : json["user1_id"])
        const userNames: Array<string> = []
        try {
            for (let i = 0; i < result.length; i++) {
                userNames.push(await getUserName(result[i]))
            }
            res.json({results: userNames})
        } catch (err) {
            res.json(err) // TODO: ERROR
        }
    })
})

function getUserName(id: string): any {
    const sqlUserName = `SELECT * FROM users WHERE _id= "?"`
    return new Promise((resolve: any, reject: any) => {
        const queryResult = (err: any, result: any) => {
            if (err) return reject(err)
            result = result.map((json: any) => json["full_name"])
            resolve(result[0])
        }
        db.query(sqlUserName, [id], queryResult)
    })
}