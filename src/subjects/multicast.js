/**
 * rxjs可以借助subject轻松实现多播
 *
 * 现实世界中，如何去多播一个信号，不可能用subject去处理，而且subject不是操作符，无法使用在pipe里面
 * 常见的多播操作符有
 *
 * 底层 multicast
 * 基于multicast的有publish、share
 */

import { Subject, multicast, of, refCount } from 'rxjs';
console.log('11');
const coldSource$ = of(1);
const hotSource$ = coldSource$.pipe(multicast(new Subject()));
// 这种例子可以实现多播，但是因为subject是一次性的，只能输出一次
hotSource$.subscribe(val => {
    console.log('ob1 ', val);
});
// 这个语句去控制多播开始的时机，之后的订阅都获取不到数据了，subject被消费完了
hotSource$.connect();
hotSource$.subscribe(val => {
    console.log('ob2 ', val);
});
/**
 * multicast可以接受一个工厂函数，每次来人订阅的时候，会从函数中创建一个新的subject
 *
 * refCount操作符，如果有订阅来，自动connect多播，所有的订阅者都完成或者取消了，自动unconnect
 * 所以multicast必须接受一个工厂函数
 */

const hotSource1$ = coldSource$.pipe(
    multicast(() => new Subject()),
    refCount()
);
hotSource1$.subscribe(val => {
    console.log('ob1 ', val);
});
hotSource1$.subscribe(val => {
    console.log('ob2 ', val);
});

/**
 * multicast接受第二个selector参数，
 * (shared) => Observable
 *
 * selector函数的参数 shared是multicast中的subject或者用工厂函数创建的subject
 * 它可以自定义多播时候返回的subject
 *
 * 在v7版本，multicast被connectable操作符替代
 */

// publish
function publish(selector) {
    if (selector) {
        return this.multicast(() => new Subject(), selector);
    } else {
        return this.multicast(new Subject());
    }
}

// share
function shareSubjectFactory() {
    return new Subject();
}
function share() {
    return multicast.call(this, shareSubjectFactory).refCount();
}
