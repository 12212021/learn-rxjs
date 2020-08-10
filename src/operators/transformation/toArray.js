/*
* toArray(): OperatorFunction
* Collects all source emissions and emits them as an array when the source completes.
* */

import {interval} from 'rxjs';
import {toArray, take} from 'rxjs/operators';

interval(1000).pipe(
    take(10),
    toArray()
).subscribe(console.log);
