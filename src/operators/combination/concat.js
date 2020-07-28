import {concat, of} from 'rxjs';

/*
* concat(observables: ...*): Observable
* Subscribe to observables in order as previous completes
* */

concat(
    of(1, 2, 3),
    of(4, 5, 6),
    of(7, 8, 9),
).subscribe(console.log);
/*
* output
* 1,2,3,4,5,6,7,8,9
* */
