const express = require('express')
const app = express()
const PORT = 8080
const cors = requrie('cors')

app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))