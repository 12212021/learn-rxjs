/*
* scan(accumulator: function, seed: any): Observable
* reduce over time
*
* */
import {interval, of} from 'rxjs';
import {scan, map, distinctUntilChanged} from 'rxjs/operators';

of(1, 2, 3, 4).pipe(
    scan((acc, cur) => acc + cur, 0)
).subscribe(console.log);
// 1 3 6 10

interval(1000).pipe(
    scan((acc, cur) => [...acc, cur], []),
    map(r => r[Math.floor(Math.random() * r.length)]),
    distinctUntilChanged()
).subscribe(console.log);
