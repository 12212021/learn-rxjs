/*
* endWith(an: Values): Observable
* 当observable完成的时候，emit（endWidth）填入的值
* 当observable尚未开始的时候，emit（startWidth）填入的值
* 当observable完成的时候，执行回调函数（finalize）
* */

import {of} from 'rxjs';
import {endWith, startWith, finalize} from 'rxjs/operators';

const obs$ = of('young', 'fault', 'lasts', 'forever');

obs$.pipe(
    endWith('end')
).subscribe(console.log);
// young
// fault
// lasts
// forever
// end

obs$.pipe(
    startWith('begin')
).subscribe(console.log);
// begin
// young
// fault
// lasts
// forever

obs$.pipe(
    finalize(() => {
        console.log('callback execute');
    })
).subscribe(console.log);
// young
// fault
// lasts
// forever
// callback execute
