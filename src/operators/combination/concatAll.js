/*
* concatAll(): Observable
* Collect observables and subscribe to next when previous completes.
* */

import {take, concatAll} from 'rxjs/operators';
import {interval, of} from 'rxjs';

const obs1$ = interval(1000).pipe(take(5));
const obs2$ = interval(500).pipe(take(2));
const obs3$ = interval(2000).pipe(take(4));

const source$ = of(obs1$, obs2$, obs3$);
const example$ = source$.pipe(concatAll());

example$.subscribe(console.log);
// source$.subscribe(console.log);
// 只有当前一个observable完成了之后，才开始订阅下一个observable
