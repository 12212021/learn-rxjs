import {
    lastValueFrom,
    from,
    retry,
    defer,
    retryWhen,
    delay,
    take,
    forkJoin,
    map,
    raceWith,
    mergeMap,
    of
} from 'rxjs';

/**
 * 通过retry提升接口的稳定性
 * retry / retryWhen / delay
 *
 */
function unstableAPI() {
    return new Promise((resolve, reject) => {
        if (Math.random() < 0.5) {
            resolve(true);
        } else {
            reject('error');
        }
    });
}
function stableAPI() {
    // 多次重试可能导致接口雪崩
    return lastValueFrom(from(defer(() => unstableAPI()).pipe(retry(10))));
}
function stableAPI1() {
    return lastValueFrom(
        from(defer(() => unstableAPI())).pipe(
            // 发生错误的时候，delay 1s，重试10次
            retryWhen(errors => errors.pipe(delay(1000), take(10)))
        )
    );
}

/**
 * 接口的时序调整，如启动屏幕，需要获取接口信息、展示logo的最小时长，防止屏幕闪烁
 */
function initData() {
    return new Promise(resolve => {
        const networkDelay = Math.random() * 3000;
        setTimeout(() => {
            resolve({ name: 'lucy' });
        }, networkDelay);
    });
}
function initDataWithMinimalDelay(minimalDelay) {
    return lastValueFrom(
        forkJoin([
            from(defer(() => initData())),
            of(true).pipe(delay(minimalDelay)),
        ]).pipe(map(([data]) => data))
    );
}

/**
 * 接口择优使用，其实是Promise的Race
 *
 */
// 快速接口
function fastAPI() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('fast data');
        }, 1000);
    });
}
// 慢速接口
function slowAPI() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('slow data');
        }, 3000);
    });
}
// 自动获取比较快的API
function getFastOne() {
    lastValueFrom(
        from(defer(() => fastAPI())).pipe(
            raceWith(from(defer(() => slowAPI())))
        )
    );
}

/**
 * 接口的竟态请求
 * switchMap 获取最新的返回
 * exhaustMap 在第一个返回以前，忽略后续请求
 * concatMap 请求排队处理，concat其实是mergeMap的一个特例，其concurrent参数为1
 * mergeMap 请求并发
 */
function concurrentRequest(list = [1, 2, 3, 4, 5, 6, 7], concurrent = 2) {
    return from(list).pipe(
        mergeMap(
            val => {
                return from(initData());
            },
            (outer, inner) => {
                return {
                    id: outer,
                    data: inner,
                };
            },
            concurrent
        )
    );
}
concurrentRequest().subscribe(data => {
    console.log(data, Date.now());
});

/**
 * 数据的多次请求组装
 */
// 模拟获取列表数据的接口
function getList() {
    return new Promise(resolve => {
        resolve([
            {
                name: 'John Brown',
                id: '1',
            },
            {
                name: 'Jim Green',
                id: '2',
            },
        ]);
    });
}

// 模拟获取状态接口
function getStatus(id) {
    return new Promise(resolve => {
        if (id === '2') {
            resolve('old');
        } else {
            resolve('young');
        }
    });
}
function getListWithStatus() {
    const getList$ = from(defer(() => getList()));
    const getStatus$ = id => from(defer(() => from(getStatus(id))));
    const data$ = getList$.pipe(
        mergeMap(list => {
            const queryList = list.map(item =>
                getStatus$(item.id).pipe(map(status => ({ ...item, status })))
            );
            return forkJoin(queryList);
        })
    );
    return lastValueFrom(data$);
}
