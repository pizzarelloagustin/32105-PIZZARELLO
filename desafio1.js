class Usuario {
    constructor ( nombre, apellido, libros, mascotas ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
        }

        getFullName() {
            console.log(`${this.nombre} ${this.apellido}`);
        }
        addMascota(nombreMascota) {
            this.mascotas.push(nombreMascota);
        }
        countMascotas() {
            console.log(`${this.mascotas.length}`);
        }
        getBooksNames(libros) {
            this.libros.map((l) => {
                console.log(`${l.nombreLibro}`)
            })
        }
        addBook( nombreLibro, autorLibro) {
            this.libros.push({ nombreLibro, autorLibro })
        }
}

const persona = new Usuario("Agustin","Pizzarello");

persona.getFullName();
persona.addMascota("Floky");
persona.addMascota("India");
persona.countMascotas();
persona.addBook("Harry Potter 1","J.K. Rowling");
persona.addBook("Game of Thrones","George R.R. Martin");
persona.getBooksNames();