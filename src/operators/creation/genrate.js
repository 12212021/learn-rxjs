/*
* generate(initialStateOrOptions: GenerateOptions, condition?: ConditionFunc, iterate?: IterateFunc, resultSelectorOrObservable?: (ResultFunc) | SchedulerLike, scheduler?: SchedulerLike): Observable
* Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
* 初试seed值；一个prediction条件函数，一个iterator迭代函数；result还可以进行结果的筛选
* */

import {generate} from 'rxjs';

generate(
    2,
    x => x <= 8,
    x => x + 3
).subscribe(console.log);

generate(
    2,
    x => x < 40,
    x => x + 3,
    x => '.'.repeat(x)
).subscribe(console.log);
