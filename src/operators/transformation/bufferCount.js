/*
* bufferCount(bufferSize: number, startBufferEvery: number = null): Observable
* Collect emitted values until provided number is fulfilled, emit as array.
* startBufferEvery: 每流过几个元素就启动一个buffer？
* */


import {interval} from 'rxjs';
import {bufferCount} from 'rxjs/operators';

// interval(1000).pipe(
//     bufferCount(3)
// ).subscribe(console.log);


interval(1000).pipe(
    // 每流过两个元素就启动了一个buffer
    bufferCount(3, 2)
).subscribe(console.log);
