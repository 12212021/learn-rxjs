/*
* defaultIfEmpty(defaultValue: any): Observable
* Emit given value if nothing is emitted before completion
* */

import {defaultIfEmpty, delay} from 'rxjs/operators';
import {of} from 'rxjs';

of().pipe(
    delay(2000),
    defaultIfEmpty('Observable is empty!')
).subscribe(console.log);

/*
* 2s后输出 'Observable is empty!'
* */
