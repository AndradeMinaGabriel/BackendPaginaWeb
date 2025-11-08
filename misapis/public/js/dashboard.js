const form = document.getElementById('productForm');
const tabla = document.getElementById('tablaProductos');
const apiURL = 'http://localhost:3000/api/TiendaAnime';

let editId = null;

async function cargarProductos() {
    tabla.innerHTML = '';
    try {
        const res = await fetch(apiURL);
        const productos = await res.json();
        productos.forEach(p => {
            const row = `<tr data-id="${p._id}">
                <td>${p.titulo}</td>
                <td>${p.nombre}</td>
                <td>${p.descripcion}</td>
                <td>${p.genero}</td>
                <td>${p.precio}</td>
                <td class="d-flex-center">
                    <button class="btn btn-sm btn-primary btn-edit">Editar</button>
                    <button class="btn btn-sm btn-danger btn-delete">Eliminar</button>
                </td>
            </tr>`;
            tabla.innerHTML += row;
        });
    } catch (err) {
        console.error('Error al cargar productos', err);
    }
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    const producto = {
        titulo: document.getElementById('titulo').value,
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        genero: document.getElementById('genero').value,
        precio: Number(document.getElementById('precio').value)
    };
    try {
        if (editId) {
            await fetch(`${apiURL}/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });
            editId = null;
        } else {
            await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });
        }
        form.reset();
        cargarProductos();
    } catch (err) {
        console.error('Error al guardar producto', err);
    }
});

tabla.addEventListener('click', e => {
    const tr = e.target.closest('tr');
    if (e.target.classList.contains('btn-edit')) {
        editId = tr.dataset.id;
        document.getElementById('titulo').value = tr.children[0].textContent;
        document.getElementById('nombre').value = tr.children[1].textContent;
        document.getElementById('descripcion').value = tr.children[2].textContent;
        document.getElementById('genero').value = tr.children[3].textContent;
        document.getElementById('precio').value = tr.children[4].textContent;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.target.classList.contains('btn-delete')) {
        const id = tr.dataset.id;
        fetch(`${apiURL}/${id}`, { method: 'DELETE' }).then(() => cargarProductos());
    }
});

cargarProductos();
