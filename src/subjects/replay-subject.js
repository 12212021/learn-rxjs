/*
* "replay" or emits old values to new subscribers
*
* */


import {ReplaySubject} from 'rxjs';

const sub = new ReplaySubject();

sub.next(1);
sub.next(2);
sub.subscribe(v => console.log(`first subscriber: ${v}`));
sub.next(3);
sub.next(4);
sub.subscribe(v => console.log(`second subscriber: ${v}`));
sub.next(5);
