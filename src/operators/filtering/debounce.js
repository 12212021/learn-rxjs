/*
* debounce(durationSelector: function): Observable
* Discard emitted values that take less than the specified time, based on selector function, between output.
* */

// debounce on timer
import {interval, of, timer} from 'rxjs';
import {debounce} from 'rxjs/operators';


// 立即展示example$ stream的最后一个元素
// 展示的元素是Last will display
const example$ = of('WAIT', 'ONE', 'SECOND', 'Last will display');
example$.pipe(
    debounce(() => timer(1000))
).subscribe(console.log);


// 5s之后就不会再有emit的值，因为debounce内部observable emit value的时间比1s要长
interval(1000).pipe(
    debounce(val => timer(val * 200))
).subscribe(console.log);
