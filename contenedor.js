const fs = require('fs')

module.exports = class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }

    getAll() {
        const response = fs.readFileSync(this.ruta, "utf-8")
        return JSON.parse(response);
    }


    getById(id) {
        const data = this.getAll();
        if (id <= 0 || id > data.length) {
            return {
                error: "El producto con el id especificado no ha sido encontrado.",
            };
        }
        return data.find(element => element.id === id);
    }

    save(objeto) {
        let itemnuevo = objeto
        const contents = fs.readFileSync(this.ruta, 'utf-8')
        const agregar = JSON.parse(contents)
        let valor = agregar.slice(-1).pop()
        let numero = valor.id + 1
        agregar.push({...itemnuevo, id:numero})
        fs.writeFileSync(this.ruta, JSON.stringify(agregar, null, 2))
        console.log(`El id asignado es ${numero}`)
    }


    update(id, product) {
        const data = this.getAll();
        if (id <= 0 || id > data.length) {
            return {
                error: "No se ha encontrado ningun producto",
            };
        }
        product.id = id
        const previousProduct = data.splice(id - 1, 1, product)
        fs.writeFileSync(this.ruta, JSON.stringify(data))

        return {
            previous: previousProduct,
            new: product,
        }
    }

    deleteById(id) {
        const array = JSON.parse(fs.readFileSync(this.ruta, 'utf-8'))
        const filtered = array.filter((item) => item.id !== id)
        fs.writeFileSync(this.ruta, JSON.stringify(filtered, null, 2))
    }
}