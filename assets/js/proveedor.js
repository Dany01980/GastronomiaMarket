export class Proveedor {
    constructor(nombre, email, telefono) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.articulos = [];
    }

    get getNombre() {
        return this.nombre;
    }
    set setNombre(nombre) {
        this.nombre = nombre;
    }
    get getEmail() {
        return this.email;
    }
    set setEmail(email) {
        this.email = email;
    }
    get getTelefono() {
        return this.telefono;
    }
    set setTelefono(telefono) {
        this.telefono = telefono;
    }
    get getArticulos() {
        return this.articulos;
    }
    agregarArticulo(articulo) {
        this.articulos.push(articulo);
    }
    eliminarArticulo(nombreArticulo) {
        this.articulos = this.articulos.filter(articulo => articulo.getNombre !== nombreArticulo);
    }
    getInfoProveedor() {
        return `Proveedor: ${this.nombre}, Email: ${this.email}, Teléfono: ${this.telefono}`;
    }
}
