/*
* throw(error: any, scheduler: Scheduler): Observable
* Emit error on subscription.
* */

import {throwError} from 'rxjs';

const source$ = throwError('this is an error!');
source$.subscribe({
    next: (val) => console.log(val),
    complete: () => console.log('Complete'),
    error: (err) => console.log(`Error: ${err}`)
});
