// Importar las clases desde los otros archivos
import { Proveedor } from './proveedor.js';
import { Articulo } from './articulo.js';
import { TipoProveedor } from './tipoProveedor.js';


let proveedores = [];
let currentProveedorIndex = -1;

const agregarFilaTabla = (proveedor, articulo) => {
    const porcentajeImpuesto = 19;
    const precio = parseFloat(articulo.getPrecio);
    const impuesto = precio * porcentajeImpuesto / 100;

    const table = $('#dataTable').DataTable();
    table.row.add([
        proveedor.getNombre,
        proveedor.getTipo,
        proveedor.getPais,
        proveedor.getEmail,
        proveedor.getTelefono,
        articulo.getNombre,
        `$${precio.toFixed(0)}`,
        `$${impuesto.toFixed(0)}`,
        `<i class="fas fa-edit btn-edit text-warning" style="cursor: pointer;"></i>
         <i class="fas fa-trash-alt btn-delete text-danger" style="cursor: pointer; margin-left: 10px;"></i>`
    ]).draw(false);
};

const editarFilaTabla = (row, proveedor, articulo) => {
    const porcentajeImpuesto = 19;
    const precio = parseFloat(articulo.getPrecio);
    const impuesto = precio * porcentajeImpuesto / 100;

    const table = $('#dataTable').DataTable();
    table.row(row).data([
        proveedor.getNombre,
        proveedor.getTipo,
        proveedor.getPais,
        proveedor.getEmail,
        proveedor.getTelefono,
        articulo.getNombre,
        `$${precio.toFixed(0)}`,
        `$${impuesto.toFixed(0)}`,
        `<i class="fas fa-edit btn-edit text-warning" style="cursor: pointer;"></i>
         <i class="fas fa-trash-alt btn-delete text-danger" style="cursor: pointer; margin-left: 10px;"></i>`
    ]).draw(false);
};

const eliminarFilaTabla = (row) => {
    const table = $('#dataTable').DataTable();
    table.row(row).remove().draw(false);

};

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreProveedor = document.getElementById('nombreProveedor').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const tipoProveedor = document.getElementById('tipoProveedor').value;
    const pais = document.getElementById('pais').value || 'N/A';
    const nombreArticulo = document.getElementById('nombreArticulo').value;
    const precioArticulo = document.getElementById('precioArticulo').value;

    const articulo = new Articulo(nombreArticulo, precioArticulo);

    if (currentProveedorIndex === -1) {
        const proveedor = new TipoProveedor(nombreProveedor, email, telefono, tipoProveedor, pais);
        proveedor.agregarArticulo(articulo);
        proveedores.push(proveedor);
        agregarFilaTabla(proveedor, articulo);
    } else {
        const proveedor = proveedores[currentProveedorIndex];
        proveedor.setNombre = nombreProveedor;
        proveedor.setEmail = email;
        proveedor.setTelefono = telefono;
        proveedor.setTipo = tipoProveedor;
        proveedor.setPais = pais;

        // Buscar y actualizar el artículo existente
        const articuloExistenteIndex = proveedor.getArticulos.findIndex(a => a.getNombre === nombreArticulo);

        if (articuloExistenteIndex !== -1) {
            proveedor.getArticulos[articuloExistenteIndex] = articulo;
        } else {
            proveedor.agregarArticulo(articulo);
        }

        const row = $('#dataTable').DataTable().row(currentProveedorIndex).node();
        editarFilaTabla(row, proveedor, articulo);
        currentProveedorIndex = -1;
    }

    document.getElementById('formulario').reset();
});

$('#dataTable tbody').on('click', '.btn-edit', function () {
    const row = $(this).closest('tr');
    currentProveedorIndex = $('#dataTable').DataTable().row(row).index();
    const proveedor = proveedores[currentProveedorIndex];

    // Cargar datos del proveedor
    document.getElementById('nombreProveedor').value = proveedor.getNombre;
    document.getElementById('email').value = proveedor.getEmail;
    document.getElementById('telefono').value = proveedor.getTelefono;
    document.getElementById('tipoProveedor').value = proveedor.getTipo;
    document.getElementById('pais').value = proveedor.getPais;

    // Cargar datos del artículo
    const articulo = proveedor.getArticulos.find(a => a.getNombre === row.find('td').eq(5).text());
    document.getElementById('nombreArticulo').value = articulo.getNombre;
    document.getElementById('precioArticulo').value = articulo.getPrecio;
});

$('#dataTable tbody').on('click', '.btn-delete', function () {
    const row = $(this).closest('tr');
    const rowIndex = $('#dataTable').DataTable().row(row).index();
    proveedores.splice(rowIndex, 1);
    eliminarFilaTabla(row);
});

$(document).ready(function () {
    $('#dataTable').DataTable({
        columnDefs: [
            { targets: [2], visible: true }
        ]
    });
});