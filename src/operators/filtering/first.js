/*
* first(predicate: function, select: function)
* Emit the first value or first to pass provided expression.
* First will deliver an EmptyError to the Observer's error callback if the Observable completes before any next notification was sent.
* If you don't want this behavior, use take(1) instead.
* 如果prediction选中的是一系列的值，选取第一个
* */


import {from} from 'rxjs';
import {first} from 'rxjs/operators';


// emit first value
from([1, 2, 3, 4, 5]).pipe(
    first()
).subscribe(val => console.log(`First Val: ${val}`));

// emit 符合条件的value
from([1, 2, 3, 4, 5]).pipe(
    first(num => num === 5)
).subscribe(console.log);

// 默认值
from([1, 2, 3, 4, 5]).pipe(
    first(val => val > 5, 'No meet value')
).subscribe(console.log);
