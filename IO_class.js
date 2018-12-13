import { compose } from './utils'
export default class IO {
    constructor(effect) {
        if (!_.isFunction(effect)) {
            throw new TypeError('IO Usage:function required')
        }
        this.effect = effect
    }
    // ----- Pointed IO
    static of(a) {
        return new IO(() => a)
    }
    // ----- Functor IO
    map(fn) {
        return new IO(compose(fn, this.effect))
    }
    // ----- Applicative IO
    ap(f) {
        return this.chain(fn => f.map(fn));
    }
    // ----- Monad IO
    chain(fn) {
        return this.map(fn).join();
    }
    join() {
        return new IO(() => {
            return this.effect().effect();
        });
    }
    run() {
        return this.effect()
    }
    inspect() {
        return `IO(?)`;
    }
}