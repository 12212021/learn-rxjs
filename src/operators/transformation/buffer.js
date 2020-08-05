/*
buffer(closingNotifier: Observable): Observable
Collect output values until provided observable emits, emit as array.

一个流总是是buffer缓存起来，buffer函数在接收到另外一个流emit信息之后，emit当前缓存的所有数据
*/

import {fromEvent, interval} from 'rxjs';
import {buffer, filter, throttleTime} from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

// 不太明白，似乎是throttleTime函数的问题
click$
    .pipe(
        buffer(click$.pipe(throttleTime(2500))),
        filter(clickList => clickList.length > 1)
    )
    .subscribe(() => console.log('double click'));


const myInterval$ = interval(1000);
const bufferBy$ = fromEvent(document, 'click');
myInterval$.pipe(buffer(bufferBy$)).subscribe(console.log);
