/*
* sample(sampler: Observable): Observable
* Sample from source when provided observable emits.
* 当inner observable emit，从source observable取样数据
* */


import {interval, zip, from, merge, fromEvent} from 'rxjs';
import {mapTo, sample} from 'rxjs/operators';

// interval(1000).pipe(
//     sample(interval(2000))
// ).subscribe(console.log);

const source$ = zip(
    from(['Joe', 'Frank', 'Bob']),
    interval(2000)
);
source$.pipe(
    //sample last emitted value from source every 2.5s
    //source observable结束了，内部sample则不发挥作用
    sample(interval(4500))
).subscribe(console.log);


const listener$ = merge(
    fromEvent(document, 'mousedown').pipe(mapTo(false)),
    fromEvent(document, 'mousemove').pipe(mapTo(true))
);
listener$.pipe(
    sample(fromEvent(document,'mouseup'))
).subscribe(isDragging => console.log('were you dragging?', isDragging))
