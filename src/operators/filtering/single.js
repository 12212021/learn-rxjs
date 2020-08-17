/*
* single(a: Function): Observable
* Emit single item that passes expression.
* 如果符合条件的序列有多个，则抛出错误

* */
import {from} from 'rxjs';
import {single} from 'rxjs/operators';

from([1, 2, 3, 4, 5, 6]).pipe(
    single(val => val % 2 === 0)
).subscribe({
    next(val) {
        console.log(val);
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('complete');
    }
});
