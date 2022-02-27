declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>

const person = {
  name: 'TSYS',
  age: 10,
  address: '11 Mian St.'
}

const nameAge = pick(person, 'name', 'age');


interface Person {
  name: string;
  age: number;
  location: string;
}

interface PartialPerson {
  name?: string;
  age?: number;
  location?: string;
}

type Partial1<T> = {
  [P in keyof T]?: T[P];
}

type halfPerson = Partial1<Person>;
