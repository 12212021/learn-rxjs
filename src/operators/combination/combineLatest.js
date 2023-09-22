import { timer, combineLatest } from 'rxjs';

/*
 * combineLatest(observables: ...Observable, project: function): Observable
 * When any observable emits a value, emit the last emitted value from each.
 * */

// 1s后emits第一value，之后每隔四秒emit一个新的value
const timerOne$ = timer(1000, 4000);
const timerTwo$ = timer(2000, 4000);
const timerThree$ = timer(3000, 4000);

combineLatest([timerOne$, timerTwo$, timerThree$]).subscribe(
    ([timerOneVal, timeTwoVal, timeThreeVal]) => {
        console.log(`
        Timer One Latest: ${timerOneVal},
        Timer Two Latest: ${timeTwoVal},
        Timer Three Latest: ${timeThreeVal},
        `);
    }
);

/*
 * 3s之后才能够打印，combineLatest直到每一个observable都发出值之后才会把他们联合在一起。
 * */
