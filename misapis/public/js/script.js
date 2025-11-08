const listaProximos = document.getElementById('listaProximos');
const apiURL = 'http://localhost:3000/api/TiendaAnime';
const alertaDiv = document.getElementById('alertaPreorden');

async function cargarProximos() {
    listaProximos.innerHTML = '';
    try {
        const res = await fetch(apiURL);
        const productos = await res.json();
        productos.forEach(p => {
            const card = `
                <div class="col">
                    <div class="card shadow-sm h-100">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${p.titulo}</h5>
                            <p class="card-text"><strong>Nombre:</strong> ${p.nombre}</p>
                            <p class="card-text"><strong>Descripción:</strong> ${p.descripcion}</p>
                            <p class="card-text"><strong>Género:</strong> ${p.genero}</p>
                            <p class="card-text"><strong>Precio:</strong> $${p.precio}</p>
                            <button class="btn btn-warning mt-auto w-100 btn-preorden">PreOrden</button>
                        </div>
                    </div>
                </div>`;
            listaProximos.innerHTML += card;
        });

        // Agregar event listener a los botones de PreOrden
        const botones = document.querySelectorAll('.btn-preorden');
        botones.forEach(btn => {
            btn.addEventListener('click', e => {
                const titulo = e.target.closest('.card').querySelector('.card-title').textContent;
                alertaDiv.textContent = `¡Gracias por preordenar "${titulo}"!`;
                alertaDiv.style.display = 'block';
                setTimeout(() => {
                    alertaDiv.style.display = 'none';
                }, 3000);
            });
        });
    } catch (err) {
        console.error('Error al cargar próximos productos', err);
    }
}

cargarProximos();
