/*
* pairwise(): Observable<Array>
* Emit the previous and current values as an array.
* 在时间轴上，取observable当前emit的值和前一个值组成一个pair数组
* */

import {pairwise, take} from 'rxjs/operators';
import {interval} from 'rxjs';

interval(1000).pipe(
    pairwise(),
    take(10)
).subscribe(console.log);
