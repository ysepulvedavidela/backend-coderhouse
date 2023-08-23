// <-------Realizar una clase ProductManager que gestione un conjunto de productos-------> //

class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(titulo, descripcion, precio, imagen, codigo, stock) {
        let product = {
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            stock
        }

        for (let i = 0; i < this.products.length; i++) {
            const element = this.products[i];
            if (element.codigo == codigo) {
                console.log("El codigo ${codigo} ya existe");
                return;
            }
        }

        if (this.products.length === 0) {
            product['id'] = 1
        } else {
            product['id'] = this.products[this.products.length - 1]['id'] + 1
        }


        this.products.push(product);


    }

    getProductById(id) {
        let obj = this.products.find(o => o.id === id);
        if (obj) {
            console.log("----------------------------");
            console.log(obj);
        } else {
            console.log("Producto no encontrado");
        }
    }

}

const producto = new ProductManager();
producto.addProduct("manga1", "mangaDescripcion1", 56, "imagen1", 12, 40);
//Producto no mostrado por codigo repetido (12)
producto.addProduct("manga2", "mangaDescripcion2", 30, "imagen2", 12, 25);
producto.addProduct("manga3", "mangaDescripcion3", 48, "imagen3", 13, 60);
console.log(producto.getProducts());

//Buscar producto por ID 1
producto.getProductById(1);