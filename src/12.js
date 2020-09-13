import { BehaviorSubject } from 'rxjs';

// subject, behaviorSubject, replaySubject, asyncSubject

const subject = new BehaviorSubject(0);

subject.next(1);
subject.next(2);

const subscription = subject.subscribe(
	(data) => console.log('Observer 1: ' + data),
	(err) => console.log(err),
	() => console.log('complete')
);

subject.next(3);
subject.next(4);
subject.next(5);

const subscription2 = subject.subscribe({
	next: (data) => console.log('Observer 2: ' + data),
	error: (err) => console.log(err),
	complete: () => console.log('complete'),
});

const interval = setInterval(() => {
	let i = 0;
	subject.next(6 + i++);
	console.log(i);
}, 1000);

setTimeout(() => {
	subscription.unsubscribe();
	clearInterval(interval);
}, 6000);

// os subjects lembram muito os eventEmitters do node
