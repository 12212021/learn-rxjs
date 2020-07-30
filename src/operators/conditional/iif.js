/*
* iif(condition: () => boolean, trueResult: SubscribableOrPromise = EMPTY, falseResult: SubscribableOrPromise = EMPTY): Observable
* Subscribe to first or second observable based on a condition
* 第一个参数返回的如果是True，运行第二个参数代表的observable，否则运行第三个参数代表的observable
* */

import {iif, of, interval} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

const r$ = of('R');
const x$ = of('X');

interval(1000).pipe(
    mergeMap(v => iif(() => v % 4 === 0, r$, x$))
).subscribe(console.log);
