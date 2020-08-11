/*
* defer(observableFactory: function(): SubscribableOrPromise): Observable
* 当stream被订阅的时候，defer内的工厂函数产生新的observable
* */

import {defer, of, timer, merge} from 'rxjs';
import {switchMap} from 'rxjs/operators';


const date1$ = of(new Date()); // 当前时间
const date2$ = defer(() => of(new Date())); // 被订阅的时候的时间

timer(2000).pipe(
    switchMap(_ => merge(date1$, date2$))
).subscribe(console.log);
