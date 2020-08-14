/*
* retry(number: number): Observable
* Useful for retrying HTTP requests!
* If you only want to retry in certain cases, check out retryWhen!
* For non error cases check out repeat!
* */

import {interval, of, throwError} from 'rxjs';
import {mergeMap, retry} from 'rxjs/operators';

interval(1000).pipe(
    mergeMap(val => {
        if (val > 5) {
            return throwError('Error');
        }
        return of(val);
    }),
    // 当发生错误的时候，又重新启动了2次retry
    retry(2)
).subscribe({
    next: console.log,
    error: console.error
});
