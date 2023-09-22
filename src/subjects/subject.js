import { Subject, map } from 'rxjs';

/**
 * Subject是rxjs中的中间者，可以将cold Observable转化为hot Observable
 *
 * hot: 无论有多少个订阅者，共享的都是一份数据
 * cold: 一对一的关系，每个订阅者都有自己独立的管道数据
 *
 *
 * Subject兼具Observable和Observer的性质，将一份数据喂给Subject可以轻易地实现多播
 */

const subject = new Subject();
subject.subscribe({
    next(val) {
        console.log('ob1', val);
    },
    complete() {
        console.log('ob1 complete');
    },
});

subject.next(1);

subject.subscribe({
    next(val) {
        console.log('ob2', val);
    },
    complete() {
        console.log('ob2 complete');
    },
});

subject.next(2);
subject.complete();

// 他可以获取到subject的结束信号
subject.subscribe({
    next(val) {
        console.log('ob3', val);
    },
    complete() {
        console.log('ob3 complete');
    },
});

/**
 * 输出
 * ob1 1
 * ob1 2
 * ob2 2
 * ob1 complete
 * ob2 complete
 * ob3 complete
 */

// 这个地方，尽管subject已经complete了，但是还是可以next，而且没有报错
// 他是不能够重复利用的
subject.next(3);

// 调用unsubscribe以后，next就会报错
// subject.unsubscribe();
subject.next(4); // object unsubscribed

// 错误处理
/**
 * subject多播的，如果下游的某一个subscriber发生错误但是没要处理的话，会波及其他的subscriber
 * 
 * subject的多播可以用如下代码理解
 * 
    for (let observer of allObservers) {
        observer.next(data);
    }
 * 有异常自然会影响其他的值, 书上是这么说的，目前7.8版本，目测不影响


 */

const subject2 = new Subject();
subject2
    .pipe(
        map(val => {
            if (val === 2) {
                return undefined.name;
            }
            return val;
        })
    )
    .subscribe(val => {
        console.log('ob1 ', val);
    });
subject2.subscribe(val => {
    console.log('ob2 ', val);
});
for (let i = 0; i < 10; i++) {
    subject2.next(i);
}
