const compose = (...fns) =>
    (...args) =>
        fns.reduceRight((res, fn) =>
            [fn.call(null, ...res)], args)[0]

const IO = effect => ({
    effect,
    map: f => IO(compose(f, effect)),
    ap: fx => fx.map(() => fx.effect(effect())),
    chain: f => IO(compose(f().effect, effect)),
    run: () => effect(),
    fold: f => f(effect()),
    inspect: () => 'IO(?)'
})

const read = () => {
    console.log('effect')
    return 'zhao tao'
}
const sm = () => 'li'
const write = (val) => val

const changeToStartCase = IO(read)
    .map(s => s.toUpperCase())
    .map(s => s.substr(0, 4))
    .chain(() => IO((x) => x + ', 222'))
    .ap(IO(x => (x + ', 111')))
    .map(write)
    .run()

console.log(
    changeToStartCase
)

// export default class IO {
//     constructor(effect) {
//         if (!_.isFunction(effect)) {
//             throw new TypeError('IO Usage:function required')
//         }
//         this.effect = effect
//     }
//     // ----- Pointed IO
//     static of(a) {
//         return new IO(() => a)
//     }
//     // ----- Functor IO
//     map(fn) {
//         return new IO(compose(fn, this.effect))
//     }
//     // ----- Applicative IO
//     ap(f) {
//         return this.chain(fn => f.map(fn));
//     }
//     // ----- Monad IO
//     chain(fn) {
//         return this.map(fn).join();
//     }
//     join() {
//         return new IO(() => {
//             return this.effect().effect();
//         });
//     }
//     run() {
//         return this.effect()
//     }
//     inspect() {
//         return `IO(?)`;
//     }
// }