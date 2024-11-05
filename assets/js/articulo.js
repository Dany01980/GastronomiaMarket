export class Articulo {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    get getNombre() {
        return this.nombre;
    }

    get getPrecio() {
        return this.precio;
    }
}
