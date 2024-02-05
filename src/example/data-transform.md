### 概述
在日常开发过程中，前端面临的数据处理挑战
- 数据来源的多样性，可能来源于代码硬编码、ajax、cache、socket 等
- 原始的数据和展示数据之间存在差异
- 数据之间存在联动的关系，如何去定义联动关系
- 缓存的处理（易失性缓存，持久性缓存）
- 前端路由导致的多入口的处理
- 跨端渲染导致处理过程的差异
- 数据处理的时序控制（竞态请求等）

#### 数据来源的多样性
数据可能有多种来源，可能来源于本地的缓存、ajax 请求，最关键的区别在于，有些数据的获取是同步的，但是有些数据的获取是异步的，由于异步可以兼容同步处理，所以这一层可以通过 Promise 或者 Observable 去包装
```js
function getDataP() {
    if (a) {
        return Promise.resolve(a);
    }
    return ajax.get('a');
}
```
或者通过 observable 去做
```js
function getDataO() {
    if (a) {
        return Observable.of(a);
    }
    return Observable.from(ajax.get(a));
}
```
无论是 Promise 还是 Observable 都可以可以封装同步、异步操作（Promise 会强制把同步变成异步，但是 Observable 不会），同时 Observable 的一个优势在于可以推送多个数据，这是 Promise 不能做到的。

#### 可以组合的数据管道
有如下的数据组合
```js
/**
data1      data2      data3
  |          |          |
  ------------          |
        |               |
        -----------------
                |
              state
 */
```
其中 data1、2、3 的数据来源方式如上述的数据来源，这种情况下，可以用 rx 去形成管道去组织数据的流动，同时如果页面涉及到大量的数据，那么针对数据做一次全量的更新，用 backend 的数据对页面做一次覆盖式更新，对带宽的需求的浏览器渲染的压力也是比较大，基于这种场景，需要`大量数据做一个精细化拆分，可以对 store 最部分更新`，同时页面渲染数据和原始数据之间存在一定的差异，这个导致 `view = (source, path)`，其中patch 代表部分更新数据。基于 Observable 有如下结论

```js
const view$ = start$.merge(path$);
// path、start 经过不同的逻辑运算，merge 起来，统一作为页面的数据源
```
