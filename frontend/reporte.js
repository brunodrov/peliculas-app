const API_URL = 'http://localhost:3000/api/peliculas/reporte'

async function cargarReporte() {
    try {
        const response = await fetch(API_URL)
        const reporte = await response.json()
        mostrarReporte(reporte)
    } catch (error) {
        console.error('Error al cargar reporte:', error)
    }
}

function mostrarReporte(reporte) {
    const contenedor = document.getElementById('tabla-reporte')

    if (reporte.length === 0) {
        contenedor.innerHTML = '<p>No hay datos para mostrar.</p>'
        return
    }

    contenedor.innerHTML = reporte.map(fila => `
        <div class="fila-reporte">
            <span class="genero">${fila.genero}</span>
            <span class="cantidad">${fila.cantidad} película/s</span>
            <span class="promedio">⭐ ${fila.promedioPuntuacion.toFixed(1)}</span>
        </div>
    `).join('')
}

document.addEventListener('DOMContentLoaded', cargarReporte)