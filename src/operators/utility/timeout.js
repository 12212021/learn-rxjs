/*
* timeout(due: number, scheduler: Scheduler): Observable
* Error if no value is emitted before specified duration
* */


import {of} from 'rxjs';
import {concatMap, timeout, catchError, delay} from 'rxjs/operators';

const makeReq = (timeToDelay) => {
    return of('request Complete!').pipe(
        delay(timeToDelay)
    );
};

of(4000, 3000, 2000).pipe(
    concatMap(duration => makeReq(duration).pipe(
        timeout(2500),
        catchError(error => of(`Request timed out after: ${duration}`))
    ))
).subscribe(console.log);
