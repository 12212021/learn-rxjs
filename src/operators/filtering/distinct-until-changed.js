/*
* distinctUntilChanged(compare: function): Observable
* Only emit when the current value is different than the last.
* distinctUntilChanged uses === comparison by default, object references must match!
* If you want to compare based on an object property, you can use distinctUntilKeyChanged instead!
* */

import {from} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

from([1, 1, 2, 2, 3, 3, 4]).pipe(
    distinctUntilChanged()
).subscribe(console.log);


const sampleObj = {name: 'test'};
from([sampleObj, sampleObj, sampleObj]).pipe(
    distinctUntilChanged()
).subscribe(console.log);


const source$ = from([
    {name: 'Brian'},
    {name: 'Joe'},
    {name: 'Joe'},
    {name: 'Sue'}
]);
source$.pipe(
    distinctUntilChanged((prev, curr) => prev.name === curr.name)
).subscribe(console.log);
