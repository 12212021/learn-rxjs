/*
* groupBy(keySelector: Function, elementSelector: Function): Observable
* Group into observables based on provided value.
* */

import {from, zip, of} from 'rxjs';
import {groupBy, mergeMap, tap, toArray} from 'rxjs/operators';

const people = [
    {name: 'Sue', age: 25},
    {name: 'Joe', age: 30},
    {name: 'Frank', age: 25},
    {name: 'Sarah', age: 35},
    {name: 'yuchi', age: 25}
];

from(people).pipe(
    groupBy(person => person.age),
    tap(console.log),
    mergeMap(group => group.pipe(
        toArray()
    ))
).subscribe(console.log);

from(people).pipe(
    groupBy(person => person.age, p => p.name),
    mergeMap(group => zip(of(group.key), group.pipe(toArray())))
).subscribe(console.log);
