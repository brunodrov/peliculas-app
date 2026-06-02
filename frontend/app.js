const API_URL = 'http://localhost:3000/api/peliculas'

// ===== CARGAR PELÍCULAS =====
async function cargarPeliculas() {
    try {
        const response = await fetch(API_URL)
        const peliculas = await response.json()
        mostrarPeliculas(peliculas)
    } catch (error) {
        console.error('Error al cargar películas:', error)
    }
}

function mostrarPeliculas(peliculas) {
    const lista = document.getElementById('lista-peliculas')

    if (peliculas.length === 0) {
        lista.innerHTML = '<p>No hay películas cargadas.</p>'
        return
    }

    lista.innerHTML = peliculas.map(pelicula => `
        <div class="tarjeta">
            <h3>${pelicula.titulo}</h3>
            <p>${pelicula.anio} — ${pelicula.genero}</p>
            <p>Director: ${pelicula.director}</p>
            <p class="sinopsis">${pelicula.sinopsis}</p>
            <p>⭐ ${pelicula.puntuacion}/5</p>
            <span class="estado estado-${pelicula.estado}">${pelicula.estado}</span>
            <div class="acciones">
                <button class="btn-editar" onclick="editarPelicula(${pelicula.id})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarPelicula(${pelicula.id})">Eliminar</button>
            </div>
        </div>
    `).join('')
}

// Cargar películas cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', cargarPeliculas)

// ===== FORMULARIO =====
const formulario = document.getElementById('formulario-pelicula')
const btnCancelar = document.getElementById('btn-cancelar')
let modoEdicion = false

formulario.addEventListener('submit', async function(e) {
    e.preventDefault()

    const id = document.getElementById('pelicula-id').value
    const datos = {
        titulo: document.getElementById('titulo').value,
        anio: parseInt(document.getElementById('anio').value),
        genero: document.getElementById('genero').value,
        director: document.getElementById('director').value,
        sinopsis: document.getElementById('sinopsis').value,
        puntuacion: parseInt(document.getElementById('puntuacion').value),
        estado: document.getElementById('estado').value
    }

    try {
        if (modoEdicion) {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            })
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            })
        }

        limpiarFormulario()
        cargarPeliculas()

    } catch (error) {
        console.error('Error al guardar película:', error)
    }
})

btnCancelar.addEventListener('click', limpiarFormulario)

function limpiarFormulario() {
    formulario.reset()
    document.getElementById('pelicula-id').value = ''
    document.getElementById('seccion-formulario').querySelector('h2').textContent = 'Agregar Película'
    modoEdicion = false
}
// ===== ELIMINAR PELÍCULA =====
async function eliminarPelicula(id) {
    if (!confirm('¿Estás seguro que querés eliminar esta película?')) return

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        cargarPeliculas()
    } catch (error) {
        console.error('Error al eliminar película:', error)
    }
}

// ===== EDITAR PELÍCULA =====
async function editarPelicula(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`)
        const pelicula = await response.json()

        document.getElementById('pelicula-id').value = pelicula.id
        document.getElementById('titulo').value = pelicula.titulo
        document.getElementById('anio').value = pelicula.anio
        document.getElementById('genero').value = pelicula.genero
        document.getElementById('director').value = pelicula.director
        document.getElementById('sinopsis').value = pelicula.sinopsis
        document.getElementById('puntuacion').value = pelicula.puntuacion
        document.getElementById('estado').value = pelicula.estado

        document.getElementById('seccion-formulario')
            .querySelector('h2').textContent = 'Editar Película'

        modoEdicion = true
        window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
        console.error('Error al cargar película:', error)
    }
}