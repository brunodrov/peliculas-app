const express = require('express')
const cors = require('cors')
const peliculasRouter = require('./routes/peliculas')

const app = express()
const PORT = 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/peliculas', peliculasRouter)

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})