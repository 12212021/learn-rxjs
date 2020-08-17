/*
* filter(select: Function, thisArg: any): Observable
* Emit values that pass the provided condition.
* */


import {from} from 'rxjs';
import {filter} from 'rxjs/operators';

from([1, 2, 3, 4, 5, 6]).pipe(
    filter(num => num % 2 === 0)
).subscribe(console.log);


from([
    {name: 'Joe', age: 31},
    {name: 'Bob', age: 25}
]).pipe(
    filter(entry => entry.name === 'Joe')
).subscribe(console.log);
