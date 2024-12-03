"use strict";
/* Head
Implementa una función head (inmutable), tal que, dado un array como entrada extraiga y devuelva su primer elemento. Utiliza destructuring. */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const head = ([first]) => first;
console.log(head([1, 2, 3, 4, 5]));
/* Tail
Implementa una función tail (inmutable), tal que, dado un array como entrada devuelta todos menos el primer elemento. Utiliza rest operator. */
const tail = ([, ...tail]) => tail;
console.log(tail([1, 2, 3, 4, 5]));
/* Init
Implementa una función init (inmutable), tal que, dado un array como entrada devuelva todos los elementos menos el último. Utiliza los métodos que ofrece Array.prototype. */
const init = (array) => [...array].slice(0, -1);
console.log(init([1, 2, 3, 4, 5]));
/* Last
Implementa una función last (inmutable), tal que, dado un array como entrada devuelva el último elemento. */
const last = (array) => array[array.length - 1];
console.log(last([1, 2, 3, 4, 5]));
/* implementa una función concat (inmutable) tal que, dados 2 arrays como entrada, devuelva la concatenación de ambos. Utiliza rest / spread operators. */
const concat = (array1, array2) => [...array1, ...array2];
console.log(concat([1, 2, 3], [4, 5, 6]));
/* Implementa una nueva versión de concat donde se acepten múltiples arrays de entrada (más de 2). No utilices el método Array.prototype.concat */
const concat2 = (...arrays) => arrays.reduce((acc, array) => [...acc, ...array], []);
console.log(concat2([1, 2, 3], [4, 5, 6], [7, 8, 9]));
/* Clone
Implementa una función clone que, a partir de un objeto de entrada source devuelva un nuevo objeto con las propiedades de source: */
const clone = (source) => (Object.assign({}, source));
console.log(clone({ a: 1, b: 2 }));
/* Implementa una función merge que, dados dos objetos de entrada source y target, devuelva un nuevo objeto con todas las propiedades de target y de source, y en caso de propiedades con el mismo nombre, source sobrescribe a target.*/
const merge = (source, target) => (Object.assign(Object.assign({}, target), source));
console.log(merge({ a: 1, b: 2 }, { b: 3, c: 4 }));
const books = [
    { title: "Harry Potter y la piedra filosofal", isRead: true },
    { title: "Canción de hielo y fuego", isRead: false },
    { title: "Devastación", isRead: true },
];
function isBookRead(books, titleToSearch) {
    const book = books.find((book) => book.title === titleToSearch);
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
    constructor() {
        this.coins = 0;
    }
    play() {
        this.coins++;
        const reel1 = Math.random() < 0.5;
        const reel2 = Math.random() < 0.5;
        const reel3 = Math.random() < 0.5;
        const hasWon = reel1 && reel2 && reel3;
        if (hasWon) {
            console.log(`Congratulations!!!. You won ${this.coins} coins!!`);
            this.coins = 0;
        }
        else {
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
// Función delay para promesas
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Función para mostrar mensajes después de un retardo
const showMessage = (_a) => __awaiter(void 0, [_a], void 0, function* ([time, message]) {
    yield delay(time);
    console.log(message);
});
// Array de funciones asíncronas que muestran mensajes
const triggers = [
    () => __awaiter(void 0, void 0, void 0, function* () { return yield showMessage([200, "third"]); }),
    () => __awaiter(void 0, void 0, void 0, function* () { return yield showMessage([100, "second"]); }),
];
const run = (triggers) => __awaiter(void 0, void 0, void 0, function* () {
    const reversedTriggers = [...triggers].reverse();
    for (const trigger of reversedTriggers) {
        yield trigger();
    }
    console.log("first");
});
run(triggers);
const myObject = {
    a: 1,
    b: {
        c: null,
        d: {
            e: 3,
            f: {
                g: "bingo",
            },
        },
    },
};
// Función deepGet para acceder a propiedades anidadas
const deepGet = (obj, ...paths) => {
    if (!paths.length)
        return obj;
    let current = obj;
    for (const path of paths) {
        if (current === undefined || current === null) {
            return undefined;
        }
        current = current[path];
    }
    return current;
};
/* resultado esperado */
console.log(deepGet(myObject, "x")); // undefined
console.log(deepGet(myObject, "a")); // 1
console.log(deepGet(myObject, "b")); // { c: null, d: {....}}
console.log(deepGet(myObject, "b", "c")); // null
console.log(deepGet(myObject, "b", "d", "f", "g")); // bingo
console.log(deepGet(myObject)); // {a: 1, b: {...}}
// Función deepSet para establecer valores anidados
const deepSet = (value, obj, ...paths) => {
    if (!paths.length)
        return;
    let current = obj;
    const lastPath = paths.pop();
    if (!lastPath)
        return;
    for (const path of paths) {
        if (current[path] === undefined || typeof current[path] !== "object") {
            current[path] = {};
        }
        current = current[path];
    }
    current[lastPath] = value;
};
deepSet(1, myObject, "a", "b");
console.log(JSON.stringify(myObject)); // {a: { b: 1}}
deepSet(2, myObject, "a", "c");
console.log(JSON.stringify(myObject)); // {a: { b: 1, c: 2}}
deepSet(3, myObject, "a");
console.log(JSON.stringify(myObject)); // {a: 3}
deepSet(4, myObject);
console.log(JSON.stringify(myObject)); // Do nothing // {a: 3}
