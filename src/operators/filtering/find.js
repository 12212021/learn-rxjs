/*
* find(predicate: function)
* Emit the first item that passes predicate then complete.
* */

import {fromEvent} from 'rxjs';
import {find, repeatWhen, mapTo, startWith, filter, tap} from 'rxjs/operators';

const status = document.getElementById('status');
const click$ = fromEvent(document, 'click');

click$.pipe(
    find(event => event.target.id === 'box'),
    mapTo('Found!'),
    startWith('find me!'),
    tap(console.log),
    repeatWhen(() => {
        return click$.pipe(
            tap((val) => console.log('inner', val)),
            filter(event => event.target.id !== 'box')
        );
    })
).subscribe(message => status.innerHTML = message);


/*
* repeatWhen响应completed信号
* retryWhen响应error信息
* */
