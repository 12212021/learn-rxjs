/*
* distinct(keySelector?, flushes?): Observable
* Emits items emitted that are distinct based on any previously emitted item.
* */

import {from, of} from 'rxjs';
import {distinct} from 'rxjs/operators';

of(1, 2, 3, 3, 4, 5, 6, 6, 7, 7, 8).pipe(
    distinct()
).subscribe(console.log);


const obj1 = {id: 3, name: 'name 1'};
const obj2 = {id: 4, name: 'name 2'};
const obj3 = {id: 3, name: 'name 3'};
const vals = [obj1, obj2, obj3];
from(vals).pipe(
    distinct(entry => entry.id)
).subscribe(console.log);
