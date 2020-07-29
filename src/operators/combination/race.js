/*
* race(): Observable
* The observable to emit first is used
* 多个observable，第一个emit值的被使用
* */

import {mapTo} from 'rxjs/operators';
import {interval, race} from 'rxjs';

const example$ = race(
    interval(1500),
    interval(1000).pipe(
        mapTo('I am won!')
    ),
    interval(2000),
    interval(3000)
);

example$.subscribe(console.log);
