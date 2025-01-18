/* 
Head
Implementa una función head (inmutable), tal que, dado un array como entrada 
extraiga y devuelva su primer elemento. Utiliza destructuring. 
*/

const head = <T>(array?: T[]): T | undefined => {
  if (!array || array.length === 0) return undefined;
  const [first] = array;
  return first;
};

console.log(head([1, 2, 3, 4, 5]));

/* 
Tail
Implementa una función tail (inmutable), tal que, dado un array como entrada 
devuelta todos menos el primer elemento. Utiliza rest operator. 
*/

const tail = <T>(array?: T[]): T[] => {
  if (!array || array.length === 0) return [];
  const [, ...rest] = array;
  return rest;
};

console.log(tail([1, 2, 3, 4, 5]));

/* 
Init
Implementa una función init (inmutable), tal que, dado un array como entrada 
devuelva todos los elementos menos el último. Utiliza los métodos que ofrece 
Array.prototype.
*/

const init = <T>(array: T[]): T[] => array.slice(0, -1);
console.log(init([1, 2, 3, 4, 5]));

/* 
Last
Implementa una función last (inmutable), tal que, dado un array como entrada 
devuelva el último elemento. 
*/

const last = <T>(array: T[]): T | undefined => array[array.length - 1];
console.log(last([1, 2, 3, 4, 5]));

/* 
Implementa una función concat (inmutable) tal que, dados 2 arrays como entrada, 
devuelva la concatenación de ambos. Utiliza rest / spread operators. 
*/

const concat = <T>(array1: T[], array2: T[]): T[] => [...array1, ...array2];
console.log(concat([1, 2, 3], [4, 5, 6]));

/* 
Implementa una nueva versión de concat donde se acepten múltiples arrays de 
entrada (más de 2). No utilices el método Array.prototype.concat 
*/

const concat2 = <T>(...arrays: T[][]): T[] =>
  arrays.reduce((acc, array): T[] => [...acc, ...array], []);
console.log(concat2([1, 2, 3], [4, 5, 6], [7, 8, 9]));

/* 
Clone
Implementa una función clone que, a partir de un objeto de entrada source 
devuelva un nuevo objeto con las propiedades de source: 
*/

const clone = <T>(source: T): T => ({
  ...source,
});
console.log(clone({ a: 1, b: 2 }));

/* 
Implementa una función merge que, dados dos objetos de entrada source y target, 
devuelva un nuevo objeto con todas las propiedades de target y de source, y en 
caso de propiedades con el mismo nombre, source sobrescribe a target.
*/

const merge = <T extends object, U extends object>(
  source: T,
  target: U
): T & U => ({ ...target, ...source });

console.log(merge({ a: 1, b: 2 }, { b: 3, c: 4 }));

/* 
Crea una función isBookRead que reciba una lista de libros y un título y 
devuelva si se ha leído o no dicho libro. Un libro es un objeto con title como 
string y isRead como booleano. En caso de no existir el libro devolver false 
TIP: Existe un método de Array.prototype que te ayudará a buscar según un patrón.
*/

interface Book {
  title: string;
  isRead: boolean;
}

const books: Book[] = [
  { title: "Harry Potter y la piedra filosofal", isRead: true },
  { title: "Canción de hielo y fuego", isRead: false },
  { title: "Devastación", isRead: true },
];

function isBookRead(books: Book[], titleToSearch: string): boolean {
  return books.some((book) => book.title === titleToSearch && book.isRead);
}

console.log(isBookRead(books, "Harry Potter y la piedra filosofal"));
console.log(isBookRead(books, "Devastación"));
console.log(isBookRead(books, "Canción de hielo y fuego"));
console.log(isBookRead(books, "Los Pilares de la Tierra"));
console.log(isBookRead(books, "El libro de las tres hebras"));

/* 
El objetivo de este ejercicio es crear una máquina tragaperras utilizando clases 
donde cada vez que juguemos insertemos una moneda. Cada máquina tragaperras 
(instancia) tendrá un contador de monedas que automáticamente se irá incrementando
conforme vayamos jugando.

Cuando se llame al método play el número de monedas se debe incrementar de forma 
automática y debe generar tres booleanos aleatorios que representarán el estado 
de las 3 ruletas. El usuario habrá ganado en caso de que los tres booleanos sean 
true, y por tanto deberá mostrarse por consola el mensaje:

"Congratulations!!!. You won <número de monedas> coins!!";
y reiniciar las monedas almacenadas, ya que las hemos conseguido y han salido de 
la máquina. En caso contrario deberá mostrar otro mensaje:

"Good luck next time!!". 
*/

class SlotMachine {
  coins: number = 0;

  play() {
    this.coins++;

    const reel1: boolean = Math.random() < 0.5;
    const reel2: boolean = Math.random() < 0.5;
    const reel3: boolean = Math.random() < 0.5;

    const hasWon: boolean = reel1 && reel2 && reel3;

    if (hasWon) {
      console.log(`Congratulations!!! You won ${this.coins} coins!!`);
      this.coins = 0;
    } else {
      console.log("Good luck next time!!");
    }
  }
}

const machine1 = new SlotMachine();
machine1.play(); // "Good luck next time!!"
machine1.play(); // "Good luck next time!!"
machine1.play(); // "Congratulations!!! You won 3 coins!!"
machine1.play(); // "Good luck next time!!"

/* Trazas por consola */

type Trigger = () => Promise<void>;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const showMessage = async ([time, message]: [
  number,
  string
]): Promise<void> => {
  await delay(time);
  console.log(message);
};

const triggers: Trigger[] = [
  async (): Promise<void> => await showMessage([200, "third"]),
  async (): Promise<void> => await showMessage([100, "second"]),
];

const run = async (triggers: Trigger[]): Promise<void> => {
  for (const trigger of triggers) {
    await trigger();
  }

  console.log("first");
};

run(triggers);

/* 
Implementa un mecanismo deepGet para acceder en profundidad a objetos anidados,
de modo que podamos recuperar una propiedad en cualquiera de sus niveles. 
Mira a continuación el comportamiento que debería seguir: 
*/

const myObject = {
  a: 1,
  b: {
    d: {
      c: null,
      e: 3,
      f: {
        g: "bingo",
      },
    },
  },
};

// [🙋‍♂️]: Esta muy bien, pero te propongo 2 retos para que practiques:
// 1. El cuerpo de tu función se puede dejar en 1 línea.
// 2. ¿Te atreves a hacer una versión recursiva**?
// ** https://developer.mozilla.org/en-US/docs/Glossary/Recursion
// [🙋‍♂️]: Hacer el tipado de esta función es muy avanzado, pero esos any ahi
// realmente no hacen nada.
const deepGet = (obj: any, ...paths: string[]): any =>
  paths.length === 0 || obj == null
    ? obj
    : deepGet(obj[paths[0]], ...paths.slice(1));

/* resultado esperado */

console.log(deepGet(myObject, "x")); // undefined
console.log(deepGet(myObject, "a")); // 1
console.log(deepGet(myObject, "b")); // { c: null, d: {....}}
console.log(deepGet(myObject, "b", "d", "c")); // null
console.log(deepGet(myObject, "b", "d", "f", "g")); // bingo
console.log(deepGet(myObject)); // {a: 1, b: {...}}

/* 
Ahora implementa el complementario, deepSet, que permita guardar valores en 
profundidad. Su comportamiento debería ser: 
*/

// [🙋‍♂️]: Esta muy bien. Si quieres por entrenar más, puedes hacer una versión sin necesidad de hacer ese "pop". Y también puedes hacer una versión recursiva si te atreves.
const deepSet = (value: any, obj: any, ...paths: string[]): void => {
  if (paths.length === 0 || obj == null) return;
  let current = obj;
  for (let i = 0; i < paths.length - 1; i++) {
    const path = paths[i];
    if (current[path] === undefined || typeof current[path] !== "object") {
      current[path] = {};
    }
    current = current[path];
  }
  current[paths[paths.length - 1]] = value;
};

deepSet(1, myObject, "a", "b");
console.log(JSON.stringify(myObject)); // {a: { b: 1}}
deepSet(2, myObject, "a", "c");
console.log(JSON.stringify(myObject)); // {a: { b: 1, c: 2}}
deepSet(3, myObject, "a");
console.log(JSON.stringify(myObject)); // {a: 3}
deepSet(4, myObject);
console.log(JSON.stringify(myObject)); // Do nothing

/* 
Dado un array multidimensional, construye una función inmutable que devuelva el 
mismo array aplanado, esto es, con un único nivel de profundidad. Por ejemplo, 
el siguiente array: 
const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];
debería devolver el siguiente array: 
[1, 2, 3, 4, 5, 6, 7, 8, 9];
*/

type NestedArray<T> = (T | NestedArray<T>)[];

const flattenArray = <T>(arr: NestedArray<T>): T[] =>
  arr.reduce<T[]>(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val),
    []
  );

const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];
const result = flattenArray(sample);

console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
/* 
¿Has resuelto el ejercicio anterior? Suponiendo que los arrays multidimensionales
del ejercicio anterior no serán de naturaleza mixta, es decir, sus elementos 
siempre serán del mismo tipo ¿Serías capaz de proporcionar un tipado adecuado a
dicha función de aplanamiento? 
*/

/* 
Implementa un mecanismo de memoización para funciones costosas y típalo con 
TypeScript. La memoización optimiza sucesivas llamadas del siguiente modo: 
*/
/* 
¿Podrías hacerlo en una sola línea? 
*/

const expensiveFunction = (): number => {
  console.log("Una única llamada");
  return 3.1415;
};

// [🙋‍♂️]: Está perfecto. Pista para dejarlo en 1 línea: las funciones también
// son objetos ¿verdad? pues quizá podrías guardar esa cache en la propia "fn"
const memoize = <T>(fn: () => T): (() => T) => {
  let cache: T;
  return (): T => cache ?? (cache = fn());
};

const memoized = memoize(expensiveFunction);
console.log(memoized()); // Una única llamada // 3.1415
console.log(memoized()); // 3.1415
console.log(memoized()); // 3.1415

/* 
NOTA: Puedes suponer que las funciones que van a ser memoizadas no llevan 
argumentos y tampoco devuelven valores null o undefined. 
*/

/*
Contempla ahora la posibilidad de que la función a memoizar pueda tener 
argumentos. Por simplicidad supongamos sólo argumentos primitivos: string, 
number o boolean y que no sean undefined. ¿Podrías hacer una versión aceptando 
argumentos? ¿Cómo la tiparías con TS? Un ejemplo de comportamiento podría ser: 
*/

type Primitive = string | number | boolean;

// [🙋‍♂️]: Perfecto, muy bien el uso de ese Map (también se podría haber usado
// un objeto nativo como diccionario).
const memoize2 = <Args extends Primitive[], Return>(
  fn: (...args: Args) => Return
): ((...args: Args) => Return) => {
  const cache = new Map<string, Return>();

  return (...args: Args): Return => {
    const key = args.map((arg): string => JSON.stringify(arg)).join();
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

let count = 0;
const repeatText = (repetitions: number, text: string): string => (
  count++, `${text} `.repeat(repetitions).trim()
);

const memoizedGreet = memoize2(repeatText);

console.log(memoizedGreet(1, "pam")); // pam
console.log(memoizedGreet(3, "chun")); // chun chun chun
console.log(memoizedGreet(1, "pam")); // pam
console.log(memoizedGreet(3, "chun")); // chun chun chun
console.log(count); // 2

/* 
¿Cómo generarías con TypeScript un tipado para estructuras en forma de árbol?
Un árbol es una estructura que parte de un nodo raíz, a partir del cual salen 
más nodos. Cada nodo en un árbol puede tener hijos (más nodos) o no tenerlos 
(convirtiéndose en un nodo final o una "hoja"). 
*/

// [🙋‍♂️]: Genial, solo una cosa, ya que es genérico con el tipo T, value debería
// ser de tipo T.
type TreeNode<T> = {
  value: string;
  children: TreeNode<T>[];
  parent?: TreeNode<T>;
};

/* ¿Existe alguna forma de que la expresión x === x de como resultado false? */

// [🙋‍♂️]: Perfecto
const x = NaN;

console.log(x === x); // false

/* 
Puedes usar la función global Number.isNaN, que verifica si un valor es 
estrictamente NaN. Si no quieres usarla directamente, puedes recrear su lógica: 
*/

// [🙋‍♂️]: Creo que el enunciado decía algo asi como:
// ¿como implementarías una función que compruebe si un determinado valor es `NaN`?
// Es super fácil por lo aprendido en el apartado 1: NaN es el único valor del
// lenguaje que no es igual a si mismo (comparado con operadores de igualdad).
// Por tanto, tu función isNaNValue simplemente tendría que hacer esta comprobación.
const isNaNValue = (v: number): boolean => Number.isNaN(v);

console.log(isNaNValue(NaN)); // true
console.log(isNaNValue(42)); // false

/* 
Habiendo resuelto la Cuestion 2 ¿Existe alguna forma de que la expresión 
!isNaNValue(x) && x !== x de como resultado true? 
*/

// [🙋‍♂️]: Te reconozco que este es complicado, hay que tirar de ingenio, y quizá
// el enunciado no se entiende bien, pero aqui no se trata de modificar la
// implementación de "isNaNValue" hecha en el apartado anterior, sino dejarla tal
// cual y pensar en un "x" que, sin ser NaN, no sea igual a si mismo. Y me dirás
// con razón ... pero Javi si me acabas de decir que NaN es el único valor del
// lenguaje que es distinto de si mismo?? Y tienes razón, aquí hay que usar
// pensamiento lateral. Te doy pistas sueltas para que conectes los puntos:
// - No hay pensar necesariamente en X como una variable, podría ser una
//   propiedad "x" del objeto global window, de esta forma se podría tratar
//   como una variable global.
// - Te suena una forma de poder engancharnos al momento en que se lee o escribe
//   una propiedad? Recuerdas los getters y setters? Y si cada vez que leemos una
//   propiedad devuelvo en un getter un valor distinto?

const isNaNValue2 = (v: any) => typeof v !== "number";

const x2 = NaN;

console.log(!isNaNValue2(x2) && x2 !== x2);

/* 
¿Podrías dar con alguna forma de que la expresión x + 1 === x - 1 arroje true? 
*/

// [🙋‍♂️]: Perfecto
const x3 = Infinity;

console.log(x3 + 1 === x3 - 1); // true

/* 
Se te ocurre alguna forma de hacer que la expresión x > x de como resultado true? 
*/

// [🙋‍♂️]: Perfecto, muy buena esta, solo un detalle, tb podría dar false aleatoriamente.
// Mejor poner tb un 'count' en ese objeto y que cada vez que valueOf devuelva algo
// sea un decremento de count.
const x4 = {
  valueOf: (): number => Math.random(),
};

console.log(x4 > x4); // true
