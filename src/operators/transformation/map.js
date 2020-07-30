/*
* map(project: Function, thisArg: any): Observable
* Apply function with each value from source.
* */

import {map} from 'rxjs/operators';
import {from} from 'rxjs';

from([1, 2, 3, 4, 5, 6]).pipe(
    map(val => val * 10)
).subscribe(console.log);
// 数字X10


from([
    {name: 'Joe', age: 30},
    {name: 'Frank', age: 20},
    {name: 'Ryan', age: 50}
]).pipe(
    map(({name}) => name)
).subscribe(console.log);
// 从对象中提取name属性
