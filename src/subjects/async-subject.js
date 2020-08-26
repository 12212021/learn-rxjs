/*
* Emit its last value on completion
*
* */

import {AsyncSubject} from 'rxjs';

const sub = new AsyncSubject();
sub.subscribe(console.log);
sub.next(123); // no thing logged
sub.subscribe(console.log);
sub.next(456);
sub.complete();

// 两个订阅者都打印出456

