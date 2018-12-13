export default class Maybe {                        // 容器类型(父类)
    static just(a) {
        return new Just(a)
    }
    static nothing() {
        return new Nothing()
    }

    static of(a) {     // 由一个可为空的类型创建Maybe(即构造函数)
        return a != null ? Maybe.just(a) : Maybe.nothing()
    }

    get isJust() {
        return false
    }
    get isNothing() {
        return false
    }
}
// Just 子类型用于处理存在的值
export class Just extends Maybe {
    constructor(val) {
        super()
        this.$value = val
    }
    map(fn) {
        return Maybe.of(fn(this.$value))  // 将映射函数作用于Just,变换其中的值，并存储回容器内
    }
    filter(fn) {
        Maybe.fromNullable(fn(this.$value) ? this.$value : null) // filter值
    }
    getOrElse() {    // Monad提供默认的一元操作符，用于从中获取其值
        return this.$value
    }
    get value() {
        return this.$value
    }
    get isJust() {
        return true
    }
    inspect() {
        return `Maybe.Just(${this.$value})`
    }
}
// Nothing子类型用于为无值的情况提供保护
export class Nothing extends Maybe {
    map(fn) {
        return this
    }
    getOrElse(other) {   // 忽略值返回other
        return other
    }
    filter() {
        return this.$value
    }
    get value() {     // 任何试图直接从Nothing类型中取值的操作都会引发表征错误的信息
        throw new TypeError('Can’t extract the value of a nothing')
    }
    get isNothing() {
        return true
    }
    inspect() {
        return `Maybe.Nothing`
    }
}