import jwt from "jsonwebtoken"
import client from "../db.js"

async function verifyAdmin(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).json({message: "Missing Token"})
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        
        const result = await client.query("SELECT role FROM users WHERE id = $1", [decoded.userId])

        if (result.rows[0]?.role !== "admin") {
            return res.status(403).json({message: "Access denied"})
        }

        req.user = decoded
        next()
    } catch (error) {
        console.error("Token verification failed:", error.message)
        res.status(401).json({message: "Invalid Token"})
    }
}

export default verifyAdmin