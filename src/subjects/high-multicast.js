/**
 * 多播基于multicast操作符，基于该操作符和subject的一些继承类，可以实现高级多播的功能
 *
 * publishLast ——>> AsyncSubject
 * publishReplay -->> ReplaySubject
 * publishBehavior -->> BehaviorSubject
 * 这些操作符和类之间是一一对应的关系
 */

import {
    multicast,
    AsyncSubject,
    interval,
    take,
    publishLast,
    refCount,
    ReplaySubject,
    publishReplay,
    BehaviorSubject,
    publishBehavior,
} from 'rxjs';

// publishLast只关心stream emit的最后一个值，并且看起来可以保留
function publishLastMock() {
    return multicast.call(this, new AsyncSubject());
}

const tick$ = interval(1000);
const shared$ = tick$.pipe(take(4), publishLast(), refCount());
shared$.subscribe(val => {
    // 4s后输出3
    console.log('publishLast: ', val);
});
setTimeout(() => {
    shared$.subscribe(val => {
        // 订阅了以后，立马输出3，因为shared$已经结束了
        console.log('publishLast: ', val);
    });
}, 5000);

/**
 *
 * @param {Number} bufferSize 代表存储的大小
 * @param {Number} windowTime 代表存储的时间窗口
 * 有些情况下其实可以reSubscribe，但是有些情况下，reSubscribe的代价比较大
 * publishReplay不会reSubscribe，只是重新播放了但是订阅的场景，重新执行了管道订阅数据时候的操作，代价小
 */
function publishReplayMock(
    bufferSize = Number.POSITIVE_INFINITY,
    windowTime = Number.POSITIVE_INFINITY
) {
    return multicast.call(this, new ReplaySubject(bufferSize, windowTime));
}

const shared1$ = tick$.pipe(take(4), publishReplay(), refCount());
shared1$.subscribe(val => {
    // 时间钟 1s输出一个值
    console.log('publishReplay ', val);
});
setTimeout(() => {
    shared1$.subscribe(val => {
        // 立即输出 0 - 3
        // 但是上游的数据并没有被重新订阅
        console.log('publishReplay ', val);
    });
}, 5000);

/**
 * 带默认数据的一个多播，这个默认值总是会被上游最新的数据替代
 *
 */
function publishBehaviorMock(defaultValue) {
    return multicast.call(this, new BehaviorSubject(defaultValue));
}

const shared2$ = tick$.pipe(take(4), publishBehavior('default'), refCount());
shared2$.subscribe(val => {
    // default - 0 - 1 - 2 - 3
    console.log('publishBehavior1 ', val);
});
setTimeout(() => {
    shared2$.subscribe(val => {
        // 1 - 2 - 3
        // 被最新的数据来替代
        console.log('publishBehavior2 ', val);
    });
}, 2500);
setTimeout(() => {
    shared2$.subscribe(val => {
        // 没有任何输出的数据，因为BehaviorSubject已经结束了
        console.log('publishBehavior3 ', val);
    });
}, 5000);
