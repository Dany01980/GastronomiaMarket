import { Proveedor } from './proveedor.js';

export class TipoProveedor extends Proveedor {
    constructor(nombre, email, telefono, tipo, pais) {
        super(nombre, email, telefono);
        this.tipo = tipo;
        this.pais = pais;
    }
    get getTipo() {
        return this.tipo;
    }
    set setTipo(tipo) {
        this.tipo = tipo;
    }
    get getPais() {
        return this.pais;
    }
    set setPais(pais) {
        this.pais = pais;
    }
    getInfoProveedor() {
        return `Nombre: ${this.getNombre}, Email: ${this.getEmail}, Teléfono: ${this.getTelefono}, Tipo: ${this.getTipo}, País: ${this.getPais}`;
    }
}
// Controlar la visibilidad del campo de país
const tipoProveedorSelect = document.getElementById('tipoProveedor');
const paisInputGroup = document.getElementById('paisGroup');
const paisInput = document.getElementById('pais');

function handleTipoProveedorChange() {
    if (tipoProveedorSelect.value === 'Nacional') {
        paisInputGroup.style.display = 'none';
        paisInput.value = 'Chile'; // Por defecto Chile
    } else {
        paisInputGroup.style.display = 'block';
        paisInput.value = ''; // Limpiar valor si es Internacional
    }
}

tipoProveedorSelect.addEventListener('change', handleTipoProveedorChange);

// Inicializar la visibilidad en función del valor predeterminado
handleTipoProveedorChange();
