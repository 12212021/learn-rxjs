/*
* from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable
* Turn an array, promise, or iterable into an observable.
* This operator can be used to convert a promise to an observable!
* For arrays and iterables, all contained values will be emitted as a sequence!
* This operator can also be used to emit a string as a sequence of characters!
* */

import {from} from 'rxjs';

from([1, 2, 3, 4]).subscribe(console.log);


const promiseSource$ = from(new Promise(resolve => resolve('hello world!')));
promiseSource$.subscribe(console.log);


const map = new Map();
map.set(1, 'hi');
map.set(2, 'goodbye');
const mapSource$ = from(map);
mapSource$.subscribe(console.log);


const characterSource$ = from('hello world!');
characterSource$.subscribe(console.log);
