// https://stackblitz.com/run?devtoolsheight=50&file=index.ts,package.json
// 轮询例子
import { of, defer, tap, mergeMap, throwError, retry, timer } from 'rxjs';

let id = 0;
const getP = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(id);
            id++;
        }, 1000);
    });
};

const source = defer(() => getP());
const subscription = source
    .pipe(
        // tap一般做一些side effect
        tap(val => console.log(val, 'yyyyy')),
        mergeMap(num => {
            return num < 10 ? throwError(() => new Error('tasking')) : of(num);
        }),
        retry({
            delay(error) {
                if (error.message === 'tasking') {
                    return timer(0);
                } else {
                    return throwError(() => error);
                }
            },
        })
    )
    .subscribe(data => console.log(data, 'finnaly'));

// cancel的话，直接
subscription.subscription();