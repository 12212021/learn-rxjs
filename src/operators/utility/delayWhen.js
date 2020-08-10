/*
* delayWhen(selector: Function, sequence: Observable): Observable
* delay when some inner observable emit value, then source observable will no be delay
* */

import {interval, timer} from 'rxjs';
import {delayWhen} from 'rxjs/operators';

const message$ = interval(1000);
const delayForFiveSeconds = () => timer(5000);

message$.pipe(
    delayWhen(delayForFiveSeconds)
).subscribe(console.log);
