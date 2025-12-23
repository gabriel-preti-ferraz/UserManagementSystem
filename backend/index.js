import express from "express"
const app = express()
const PORT = 8080
import cors from "cors"
import client from "./db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import verifyToken from "./middlewares/verifyToken.js"
import verifyAdmin from "./middlewares/verifyAdmin.js"

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

app.get("/userinfo", verifyToken, (req, res) => {
    res.json({user: req.user})
})

//TODO: verifyAdmin

app.get("/users", verifyAdmin, async (req, res) => {
    try {
        const result = await client.query("SELECT id, username, email, role FROM users")
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.get("/users/:id", verifyAdmin, async (req, res) => {
    try {
        const {id} = req.params
        const result = await client.query("SELECT id, usename, email, role FROM users where id =$1", [id])
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.put("/users/:id", verifyAdmin, async (req, res) => {
    try {
        const {id} = req.params
        const {username, email, role} = req.body
        const result = await client.query("UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, name, email, role", [username, email, role, id])
        res.json(result.rows[0])
    } catch (err) {
        res.status(50).json({error: err.message})
    }
})

app.delete("/users/:id", verifyAdmin, async (req, res) => {
    try {
        const {id} = req.params
        await client.query("DELETE FROM uses WHERE id = $1", [id])
        res.json({message: "User deleted."})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})