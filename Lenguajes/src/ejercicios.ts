/* Head
Implementa una función head (inmutable), tal que, dado un array como entrada extraiga y devuelva su primer elemento. Utiliza destructuring. */

const head = <T>([first]: [T, ...T[]]): T => first;
console.log(head([1, 2, 3, 4, 5]));

/* Tail
Implementa una función tail (inmutable), tal que, dado un array como entrada devuelta todos menos el primer elemento. Utiliza rest operator. */

const tail = <T>([, ...tail]: [T, ...T[]]): T[] => tail;
console.log(tail([1, 2, 3, 4, 5]));

/* Init
Implementa una función init (inmutable), tal que, dado un array como entrada devuelva todos los elementos menos el último. Utiliza los métodos que ofrece Array.prototype. */

const init = (array: number[]): number[] => [...array].slice(0, -1);
console.log(init([1, 2, 3, 4, 5]));

/* Last
Implementa una función last (inmutable), tal que, dado un array como entrada devuelva el último elemento. */

const last = (array: number[]): number => array[array.length - 1];
console.log(last([1, 2, 3, 4, 5]));

/* implementa una función concat (inmutable) tal que, dados 2 arrays como entrada, devuelva la concatenación de ambos. Utiliza rest / spread operators. */

const concat = (array1: number[], array2: number[]) => [...array1, ...array2];
console.log(concat([1, 2, 3], [4, 5, 6]));

/* Implementa una nueva versión de concat donde se acepten múltiples arrays de entrada (más de 2). No utilices el método Array.prototype.concat */

const concat2 = (...arrays: number[][]): number[] =>
  arrays.reduce((acc, array): number[] => [...acc, ...array], []);
console.log(concat2([1, 2, 3], [4, 5, 6], [7, 8, 9]));

/* Clone
Implementa una función clone que, a partir de un objeto de entrada source devuelva un nuevo objeto con las propiedades de source: */

const clone = (source: { a: number; b: number }): { a: number; b: number } => ({
  ...source,
});
console.log(clone({ a: 1, b: 2 }));

/* Implementa una función merge que, dados dos objetos de entrada source y target, devuelva un nuevo objeto con todas las propiedades de target y de source, y en caso de propiedades con el mismo nombre, source sobrescribe a target.*/

const merge = (
  source: { a: number; b: number },
  target: { b: number; c: number }
): { a: number; b: number; c: number } => ({ ...target, ...source });
console.log(merge({ a: 1, b: 2 }, { b: 3, c: 4 }));

/* Crea una función isBookRead que reciba una lista de libros y un título y devuelva si se ha leído o no dicho libro. Un libro es un objeto con title como string y isRead como booleano. En caso de no existir el libro devolver false TIP: Existe un método de Array.prototype que te ayudará a buscar según un patrón.*/

interface Book {
  title: string;
  isRead: boolean;
}

const books: Book[] = [
  { title: "Harry Potter y la piedra filosofal", isRead: true },
  { title: "Canción de hielo y fuego", isRead: false },
  { title: "Devastación", isRead: true },
];
function isBookRead(books: any[], titleToSearch: string): boolean {
  const book = books.find(
    (book: { title: string; isRead: boolean }): boolean =>
      book.title === titleToSearch
  );
  if (book) {
    return book.isRead;
  }
  return false;
}
console.log(isBookRead(books, "Harry Potter y la piedra filosofal"));
console.log(isBookRead(books, "Devastación"));
console.log(isBookRead(books, "Canción de hielo y fuego"));
console.log(isBookRead(books, "Los Pilares de la Tierra"));
console.log(isBookRead(books, "El libro de las tres hebras"));

/* El objetivo de este ejercicio es crear una máquina tragaperras utilizando clases donde cada vez que juguemos insertemos una moneda. Cada máquina tragaperras (instancia) tendrá un contador de monedas que automáticamente se irá incrementando conforme vayamos jugando.

Cuando se llame al método play el número de monedas se debe incrementar de forma automática y debe generar tres booleanos aleatorios que representarán el estado de las 3 ruletas. El usuario habrá ganado en caso de que los tres booleanos sean true, y por tanto deberá mostrarse por consola el mensaje:

"Congratulations!!!. You won <número de monedas> coins!!";
y reiniciar las monedas almacenadas, ya que las hemos conseguido y han salido de la máquina. En caso contrario deberá mostrar otro mensaje:

"Good luck next time!!". */

class SlotMachine {
  coins: number;
  constructor() {
    this.coins = 0;
  }

  play() {
    this.coins++;

    const reel1: boolean = Math.random() < 0.5;
    const reel2: boolean = Math.random() < 0.5;
    const reel3: boolean = Math.random() < 0.5;

    const hasWon: boolean = reel1 && reel2 && reel3;

    if (hasWon) {
      console.log(`Congratulations!!!. You won ${this.coins} coins!!`);
      this.coins = 0;
    } else {
      console.log("Good luck next time!!");
    }
  }
}

const machine1 = new SlotMachine();
machine1.play(); // "Good luck next time!!"
machine1.play(); // "Good luck next time!!"
machine1.play(); // "Congratulations!!!. You won 3 coins!!"
machine1.play(); // "Good luck next time!!"
machine1.play(); // "You won all the coins!!"
