/*
* concatMapTo(observable: Observable, resultSelector: function): Observable
* Projects each source value to the same Observable which is merged multiple times in a serialized fashion on the output Observable.
* 将外层的observable的value映射为一个内层的observable，然后将两个值可以选择性的concat在一起
* */

import {of, interval} from 'rxjs';
import {concatMapTo, take, delay} from 'rxjs/operators';

const sample$ = interval(500).pipe(
    take(5)
);

const fakeRequests$ = of('network finish!').pipe(
    delay(3000)
);
//
// sample$.pipe(
//     concatMapTo(fakeRequests$)
// ).subscribe(console.log);


const interval$ = interval(2000);
const source$ = interval(1000).pipe(
    take(5)
);
interval$.pipe(
    concatMapTo(source$, (firstInterval, secondInterval) => {
        return `${firstInterval}: ${secondInterval}`;
    })
).subscribe(console.log);
