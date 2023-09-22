/*
 * combineAll(project: function): Observable
 * Flattens an Observable-of-Observables by applying combineLatest when the Observable-of-Observables completes.
 * */

import { take, map, combineLatestAll } from 'rxjs/operators';
import { interval } from 'rxjs';

// 每隔一秒生成一个数据（无限序列）  take取前两个
const source$ = interval(1000).pipe(take(2));

/*
 * source内部被映射成了两个内部的interval Observables
 * combineLatestAll主要的作用是将内部的observable给拍平，一般情况下比较少使用，mergeMap, switchMap等操作符自带拍平
 * 
 * */

/*
output:
  ["Result (0): 0", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 4"]
* */
const example$ = source$.pipe(
    map(val =>
        interval(1000).pipe(
            map(i => `out: (${val}); inner: ${i}`),
            take(5)
        )
    )
);

const combined$ = example$.pipe(combineLatestAll());

combined$.subscribe(console.log);
