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

/* Trazas por consola */

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const showMessage = async ([time, message]: [
  number,
  string
]): Promise<void> => {
  await delay(time);
  console.log(message);
};

const triggers: Array<() => Promise<void>> = [
  async (): Promise<void> => await showMessage([200, "third"]),
  async (): Promise<void> => await showMessage([100, "second"]),
];

const run = async (triggers: Array<() => Promise<void>>): Promise<void> => {
  const reversedTriggers = [...triggers].reverse();

  for (const trigger of reversedTriggers) {
    await trigger();
  }

  console.log("first");
};

run(triggers);

/* Implementa un mecanismo deepGet para acceder en profundidad a objetos anidados, de modo que podamos recuperar una propiedad en cualquiera de sus niveles. Mira a continuación el comportamiento que debería seguir: */

const myObject: { [key: string]: any } = {
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

const deepGet = (obj: any, ...paths: string[]): any => {
  if (!paths.length) return obj;
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

/* Ahora implementa el complementario, deepSet, que permita guardar valores en profundidad. Su comportamiento debería ser: */

const deepSet = (value: any, obj: any, ...paths: string[]): void => {
  if (!paths.length) return;
  let current = obj;
  const lastPath = paths.pop();

  if (!lastPath) return;

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

/* Dado un array multidimensional, construye una función inmutable que devuelva el mismo array aplanado, esto es, con un único nivel de profundidad. Por ejemplo, el siguiente array: 
 debería devolver el siguiente array: */
/* ¿Has resuelto el ejercicio anterior? Suponiendo que los arrays multidimensionales del ejercicio anterior no serán de naturaleza mixta, es decir, sus elementos siempre serán del mismo tipo ¿Serías capaz de proporcionar un tipado adecuado a dicha función de aplanamiento? */

type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;

const flattenArray = <T>(arr: T[]): Flatten<T>[] => {
  const flatten = (input: T[]): Flatten<T>[] => {
    return input.reduce<Flatten<T>[]>(
      (acc, val): Flatten<T>[] =>
        Array.isArray(val)
          ? acc.concat(flatten(val))
          : acc.concat(val as Flatten<T>),
      []
    );
  };
  return flatten(arr);
};

const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];
const result = flattenArray(sample);

console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

/* Implementa un mecanismo de memoización para funciones costosas y típalo con TypeScript. La memoización optimiza sucesivas llamadas del siguiente modo: */
/* ¿Podrías hacerlo en una sola línea? */

const expensiveFunction = (): number => {
  console.log("Una única llamada");
  return 3.1415;
};

const memoize = <T>(fn: () => T): (() => T) => {
  let cache: T;
  return (): T => cache ?? (cache = fn());
};

const memoized = memoize(expensiveFunction);
console.log(memoized()); // Una única llamada // 3.1415
console.log(memoized()); // 3.1415
console.log(memoized()); // 3.1415

/* NOTA: Puedes suponer que las funciones que van a ser memoizadas no llevan argumentos y tampoco devuelven valores null o undefined. */

/*Contempla ahora la posibilidad de que la función a memoizar pueda tener argumentos. Por simplicidad supongamos sólo argumentos primitivos: string, number o boolean y que no sean undefined. ¿Podrías hacer una versión aceptando argumentos? ¿Cómo la tiparías con TS? Un ejemplo de comportamiento podría ser: */

type Primitive = string | number | boolean;

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

/* ¿Cómo generarías con TypeScript un tipado para estructuras en forma de árbol?
Un árbol es una estructura que parte de un nodo raíz, a partir del cual salen más nodos. Cada nodo en un árbol puede tener hijos (más nodos) o no tenerlos (convirtiéndose en un nodo final o una "hoja"). */

type TreeNode<T> = {
  value: string;
  children: TreeNode<T>[];
  parent?: TreeNode<T>;
};

/* ¿Existe alguna forma de que la expresión x === x de como resultado false? */

const x = NaN;

console.log(x === x); // false

/* Puedes usar la función global Number.isNaN, que verifica si un valor es estrictamente NaN. Si no quieres usarla directamente, puedes recrear su lógica: */

const isNaNValue = (v: number): boolean => Number.isNaN(v);

console.log(isNaNValue(NaN)); // true
console.log(isNaNValue(42)); // false

/* Habiendo resuelto la Cuestion 2 ¿Existe alguna forma de que la expresión !isNaNValue(x) && x !== x de como resultado true? */

const isNaNValue2 = (v: any) => typeof v !== "number";

const x2 = NaN;

console.log(!isNaNValue2(x2) && x2 !== x2);

/* ¿Podrías dar con alguna forma de que la expresión x + 1 === x - 1 arroje true? */

const x3 = Infinity;

console.log(x3 + 1 === x3 - 1); // true

/* Se te ocurre alguna forma de hacer que la expresión x > x de como resultado true? */

const x4 = {
  valueOf: (): number => Math.random(),
};

console.log(x4 > x4); // true
