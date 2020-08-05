/*
* bufferWhen(closingSelector: function): Observable
* Collect all values until closing selector emits, emit buffered values
* */


import {interval} from 'rxjs';
import {bufferWhen} from 'rxjs/operators';

const source$ = interval(1000);
source$.pipe(
    bufferWhen(() => {
        return interval(5000);
    })
).subscribe(console.log);
