const express = require('express')
const router = express.Router()
const peliculas = require('../data/peliculas')

let nextId = 6

// GET /api/peliculas - Obtener todas las películas
router.get('/', (req, res) => {
    res.status(200).json(peliculas)
})

// GET /api/peliculas/reporte - Reporte por género
router.get('/reporte', (req, res) => {
    const reporte = {}

    peliculas.forEach(pelicula => {
        const genero = pelicula.genero

        if (!reporte[genero]) {
            reporte[genero] = {
                genero,
                cantidad: 0,
                sumaPuntuaciones: 0,
                promedioPuntuacion: 0
            }
        }

        reporte[genero].cantidad++
        reporte[genero].sumaPuntuaciones += pelicula.puntuacion
        reporte[genero].promedioPuntuacion = reporte[genero].sumaPuntuaciones / reporte[genero].cantidad
    })

    const resultado = Object.values(reporte)

    res.status(200).json(resultado)
})

// GET /api/peliculas/:id - Obtener una película por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pelicula = peliculas.find(p => p.id === id)

    if (!pelicula) {
        return res.status(404).json({ mensaje: 'Película no encontrada' })
    }

    res.status(200).json(pelicula)
})

// POST /api/peliculas - Agregar una película nueva
router.post('/', (req, res) => {
    const { titulo, anio, genero, director, sinopsis, puntuacion, estado } = req.body

    if (!titulo || !anio || !genero || !director) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' })
    }

    const nuevaPelicula = {
        id: nextId,
        titulo,
        anio,
        genero,
        director,
        sinopsis,
        puntuacion,
        estado
    }

    peliculas.push(nuevaPelicula)
    nextId++

    res.status(201).json(nuevaPelicula)
})

// PUT /api/peliculas/:id - Editar una película
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = peliculas.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Película no encontrada' })
    }

    const { titulo, anio, genero, director, sinopsis, puntuacion, estado } = req.body

    if (!titulo || !anio || !genero || !director) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' })
    }

    peliculas[index] = {
        id,
        titulo,
        anio,
        genero,
        director,
        sinopsis,
        puntuacion,
        estado
    }

    res.status(200).json(peliculas[index])
})

// DELETE /api/peliculas/:id - Eliminar una película
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = peliculas.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Película no encontrada' })
    }

    peliculas.splice(index, 1)

    res.status(200).json({ mensaje: 'Película eliminada correctamente' })
})


module.exports = router