/*
* sequenceEqual(compareTo: Observable, comparor?: (a, b) => boolean): Observable
* Compares emitted sequence to expected sequence for match
* */

import {of, from, fromEvent} from 'rxjs';
import {sequenceEqual, switchMap, map, tap, bufferCount, mergeMap} from 'rxjs/operators';

const expectedSeq = from([4, 5, 6]);
of([1, 2, 3], [4, 5, 6,], [7, 8, 9]).pipe(
    switchMap(arr => from(arr).pipe(
        sequenceEqual(expectedSeq)
    ))
).subscribe(console.log);


const expectedSequence = from(['q', 'w', 'e', 'r', 't', 'y']);
const setResult = text => (document.getElementById('result').innerText = text);

fromEvent(document, 'keydown')
    .pipe(
        map((e) => e.key),
        tap(v => setResult(v)),
        bufferCount(6),
        mergeMap(keyDowns =>
            from(keyDowns).pipe(
                sequenceEqual(expectedSequence),
                tap(isItQwerty => setResult(isItQwerty ? 'WELL DONE!' : 'TYPE AGAIN!'))
            )
        )
    )
    .subscribe(e => console.log(`did you say qwerty? ${e}`));
