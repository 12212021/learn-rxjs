/*
* Requires an initial value and emits the current value to new subscribers
* If you want the last emitted value(s) on subscription,
* but do not need to supply a seed value, check out ReplaySubject instead!
* */

import {BehaviorSubject, from, fromEvent, interval, merge} from 'rxjs';
import {map, tap, mergeMap} from 'rxjs/operators';

const subject = new BehaviorSubject(123);
// two new subscribers will get initial value => output: 123 123
subject.subscribe(console.log);
subject.subscribe(console.log);

// two subscribers will get new values => output: 456 456
subject.next(456);

// new subscriber will get latest value (456) => output: 456
subject.subscribe(console.log);

// all three subscribers will get new value => output: 789 789 789
subject.next(789);


// BehaviorSubject with new subscribers created on mouse clicks
// 这里例子暂时有一点不明白

const setElementText = (elemId, text) =>
    (document.getElementById(elemId)).innerText = text.toString();
const addHtmlElement = coords =>
    (document.querySelector('.behavior').innerHTML) = `
    <div 
    id=${coords.id}
    class="behavior"
    style="
      position: absolute;
      height: 30px;
      width: 30px;
      text-align: center;
      top: ${coords.y}px;
      left: ${coords.x}px;
      background: silver;
      border-radius: 80%;"
    >
  </div>`;

const subject1 = new BehaviorSubject(0);
const click$ = fromEvent(document, 'click').pipe(
    map(e => ({
        x: e.clientX,
        y: e.clientY,
        id: Math.random()
    })),
    tap(addHtmlElement),
    mergeMap(coords => subject1.pipe(
        tap(v => setElementText(coords.id, v))
    ))
);

const interval$ = interval(1000).pipe(
    tap(v => subject1.next(v)),
    tap(v => setElementText('intervalValue', v))
);
merge(click$, interval$).subscribe();
