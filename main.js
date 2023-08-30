// <-------Realizar una clase ProductManager que gestione un conjunto de productos-------> //
//Pre Entrega 2

const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path;
        try {
            this.objs = fs.readFileSync(this.path, 'utf-8');
            this.objs = JSON.parse(this.objs)

        } catch (error) {
            this.objs = []
        }
    }

    getProducts() {
        return this.objs
    }

    async addProduct(titulo, descripcion, precio, imagen, codigo, stock) {
        let product = {
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            stock
        }

        for (const key in product) {
            if (Object.hasOwnProperty.call(product, key)) {
                const e = product[key];
                if (!e) {
                    console.log("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
                    console.log(`El producto ${titulo} no puede ser mostrado; Problema: ${key}:${e}`);
                    console.log("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
                    return;
                }
            }
        }

        for (let i = 0; i < this.objs.length; i++) {
            const element = this.objs[i];
            if (element.codigo == codigo) {
                console.log("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
                console.log(`El producto con codigo ${codigo} ya existe.`);
                console.log("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
                return;
            }
        }

        if (this.objs.length === 0) {
            product['id'] = 1
        } else {
            product['id'] = this.objs[this.objs.length - 1]['id'] + 1
        }
        this.objs.push(product)

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'))
            console.log('Producto guardado con exito.')
        } catch (error) {
            console.log('Error al guardar:', error)
        }
    }

    getProductById(id) {
        let obj = this.objs.find(o => o.id === id);
        if (obj) {
            console.log("");
            console.log("▄▄▄→ Producto encontrado por ID ←▄▄▄");
            console.log(obj);
            console.log("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
            console.log("");
        } else {
            console.log("Producto no encontrado");
        }

    }

    async deleteProduct(id) {
        try {
            const obj = this.objs.findIndex((elm) => elm.id === id)
            if (obj !== -1) {
                this.objs.splice(obj, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'))
                console.log('Lista de productos actualizada, producto eliminado.');
            } else {
                console.log('No existe el producto.');
            }
        } catch (error) {
            console.log('Error al eliminar ID.', error);
        }
    }

    async update(id, element) {
        try {
            const oldElement = this.objs.find((element) => element.id === id)
            const index = this.objs.findIndex((elemento) => elemento.id === id)

            if (index !== -1) {
                const newElement = { ...oldElement, ...element }
                this.objs[index] = newElement
                await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'))
                console.log('Producto actualizado.')
            }
        } catch (error) {
            console.log('Error update:', error)
        }
    }

}

const producto = new ProductManager('./products.json');
producto.addProduct("manga1", "mangaDescripcion1", 10000, "imagen1", "abc1", 5);
//Producto no mostrado por codigo repetido (abc1)
producto.addProduct("manga2", "mangaDescripcion2", 15990, "imagen2", "abc1", 15);
producto.addProduct("manga3", "mangaDescripcion3", 9990, "imagen3", "abc3", 30);
producto.addProduct("manga4", "mangaDescripcion4", 5990, "imagen4", "abc4", 23);
//No se guarda por falta de stock
producto.addProduct("manga5", "mangaDescripcion5", 5990, "imagen5", "abc5");
//Buscar producto por ID 1
//producto.getProductById(1)
//Muestra productos existentes
console.log(producto.getProducts());
//Modifica el precio
//producto.update(3, { precio: 8765 });
//Elimina producto ID 2
//producto.deleteProduct(2)