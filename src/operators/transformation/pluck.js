/*
* pluck(properties: ...args): Observable
* Select property to emit.
* */

import {from} from 'rxjs';
import {pluck} from 'rxjs/operators';

const people = [
    {name: 'Joe', age: 30},
    {name: 'Sarah', age: 35}
];

from(people).pipe(
    pluck('name')
).subscribe(console.log);

const source$ = from([
    {name: 'Joe', age: 30, job: {title: 'Developer', language: 'JavaScript'}},
    // 这里没有nested的属性值，所以返回的就是undefined
    {name: 'Sarah', age: 35}
]);

source$.pipe(
    pluck('job', 'title')
).subscribe(console.log);
