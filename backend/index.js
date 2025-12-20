import express from "express"
const app = express()
const PORT = 8080
import cors from "cors"
import client from "./db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const result = await client.query(
            "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const result = await client.query("SELECT * FROM users WHERE email = $1", [email])
        
        const user = result.rows[0]
        if (!user) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "3d" })
        res.json({token})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

function verifyToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({message: "Missing Token"})
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        console.error("Token verification failed:", error.message)
        res.status(401).json({message: "Invalid Token"})
    }
}

app.get("/userinfo", verifyToken, (req, res) => {
    res.json({user: req.user})
})