### RXJS基础概念


#### pull vs push
push和pull是两种不同的协议，用来描述生产者（producer）和消费者（consumer）之间是如何进行通信的
- function 惰性的pull，调用的时候会同步地返回一个单一的值
- generator 惰性的pull，调用的时候会同步地返回多个值（也可以无线）
- Promise 惰性push，最后会返回一个或者没有返回值
- observable 惰性push，从它被订阅的时候会同步或者异步地产生0个~无穷个值

#### 什么是observable
observable代表了一个流，有着时间轴的数据流。observable是惰性的，observable只有被订阅了之后，才会开始执行


#### Subscription
订阅者，当一个observable被函数subscribe之后，会返回一个订阅者Subscription，订阅者能取消订阅。


#### pipe function
pipe函数类似于一个流水线，所有observable数据流流过惯导，被一个个operator进行处理


#### Operators
operator其实一个代表操作的function，数据流中的数据流过管道pipe的时候，会这这些operator处理


#### Subject
subject是特殊类型的observable，它能够将值传递给多个observer，subject是多播的，（普通的observable是单播的，且没有订阅的observer都
是独立执行的）。
- 每个subject都是observable，提供一个observer就能够工作，observer无法分辨自己从subject还是普通的observable获取的值
- 每个subject也是观察者，他有next、error、complete方法，给subject提供新值，只需要调用next(value)，subject会将值多播出去


#### Scheduler

