/*
* skip(the: Number): Observable
* Skip the provided number of emitted values.
* 跳过source observable的前x个元素
*
* */
import {interval} from 'rxjs';
import {skip} from 'rxjs/operators';

interval(1000).pipe(
    skip(2)
).subscribe(console.log);
