// 轮询例子
import {
    of,
    defer,
    throwError,
    timer,
    EMPTY,
    Subject,
    BehaviorSubject,
    asyncScheduler,
} from 'rxjs';
import {
    tap,
    mergeMap,
    retry,
    repeat,
    delay,
    repeatWhen,
    observeOn,
    take,
    takeWhile,
} from 'rxjs/operators';

let id = 0;
const getP = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(id);
            id++;
        }, 1000);
    });
};

const source = defer(() => getP());
const subscription = source.pipe(
    // tap一般做一些side effect
    tap(val => console.log(val, 'retry')),
    mergeMap(num => {
        return num < 10 ? throwError(() => new Error('tasking')) : of(num);
    }),
    retry({
        delay(errors) {
            if (errors.message === 'tasking') {
                return timer(5000);
            } else {
                return throwError(() => errors);
            }
        },
    })
);

// subscription.subscribe(final => console.log(final, 'retry final'));
// cancel的话，直接unsubscribe
let isTasking = true;
const subscription1 = defer(() => getP()).pipe(
    tap(num => console.log(num, 'repeat')),
    repeat({
        delay(count) {
            // count是数据被订阅的次数
            // console.log(count, 'ccc');
            if (isTasking) {
                return of(0).pipe(delay(5000));
            } else {
                return EMPTY;
            }
        },
    })
);

// subscription1.subscribe(final => {
//     if (final < 10) {
//         isTasking = true;
//     } else {
//         isTasking = false;
//     }
// });

// behaviorSubject每次只要有人subscribe，就会next一个当前引用的最新值
const behaviorSubject$ = new BehaviorSubject(0);
const subscription2 = defer(getP).pipe(
    repeat({
        delay: () => {
            return behaviorSubject$;
        },
    })
);

subscription2.subscribe({
    next: val => {
        console.log(val, 'subject');
        if (val < 10) {
            behaviorSubject$.next(0);
        } else {
            behaviorSubject$.complete();
        }
    },
});

const subject$ = new Subject();
const subscription3 = defer(getP).pipe(
    repeat({
        delay: () => {
            return subject$;
        },
    })
);

subscription3.subscribe(val => {
    if (val < 10) {
        timer(5000).subscribe(() => {
            subject$.next(0);
        });
        // subject.next();
        // 这里如果直接next，线性执行，会先执行subject.next 
        // 然后observable执行完成，执行repeat，subscribe subject这个observable
        // 但是这个observable已经完成了，所以repeat不会流出任何信号
    } else {
        subject$.complete();
    }
});
