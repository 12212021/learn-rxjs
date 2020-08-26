/*
* throttleTime(duration: number, scheduler: Scheduler, config: ThrottleConfig): Observable
* Emit first value then ignore for specified duration
* @params duration: Time to wait before emitting another value after emitting the last value,
* measured in milliseconds or the time unit determined internally by the optional scheduler.
*
* @params scheduler: Optional. Default is async,The SchedulerLike to use for managing the timers
* that handle the throttling.
*
* @params config:Optional. Default is defaultThrottleConfig.
* a configuration object to define leading and trailing behavior.
* Defaults to { leading: true, trailing: false }.
* */

import {interval, asyncScheduler} from 'rxjs';
import {throttleTime} from 'rxjs/operators';


// emit the first value, ignore 5s window
interval(1000).pipe(
    throttleTime(5000)
).subscribe(console.log);

// leading、trailing config是确定throttle取值是第一个还是最后一个
interval(1000).pipe(
    throttleTime(5000, asyncScheduler, {trailing: true})
).subscribe(console.log);
