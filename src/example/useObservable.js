const { BehaviorSubject } = require('rxjs');

const useObservableValue = value => {
    const subject = React.useRef(new BehaviorSubject(value));

    useEffect(() => {
        subject.current.next(value);
    }, [value]);

    return React.useMemo(() => {
        subject.current.asObservable();
    }, [subject]);
};
