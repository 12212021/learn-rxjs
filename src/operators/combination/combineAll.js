/*
* combineAll(project: function): Observable
* When source observable completes use combineLatest with collected observables.
* */

import {take, map, combineAll} from 'rxjs/operators';
import {interval} from 'rxjs';

// 每隔一秒生成一个数据（无限序列）  take取前两个
const source$ = interval(1000).pipe(take(2));

/*
* source内部被映射成了两个内部的interval Observables
* combineAll使用combinationLatest的策略来合并流，每当内部observable发出一个value的时候
* 会将两个inner observable发出的最新的val合并在一起
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
        interval(1000)
        .pipe(
            map(i => `Result (${val}): ${i}`),
            take(5)
        )
    )
);

const combined$ = example$.pipe(combineAll());

combined$.subscribe(console.log);
