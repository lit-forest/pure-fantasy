export default class Either {
    constructor(value) {
        this._value = value;
    }
    static left(a) {
        return new Left(a)
    }
    static right(a) {
        return new Right(a)
    }
    static of(a) {
        return Either.right(a)
    }
    static fromNullable(val) {
        return val != null ? Either.right(val) : Either.left(val)
    }
    get value() {
        return this._value
    }
}

export class Left extends Either {
    map() {
        return this
    }
    getOrElse(other) {
        return other
    }
    orElse(fn) {
        return fn(this.value)
    }
    chain(fn) {
        return this
    }
    getOrElseThrow(a) {
        throw new Error(a)
    }
    filter(fn) {
        return this
    }
    get value() {
        throw new TypeError('Can’t extract the value of a Left(a).')
    }
}

export class Right extends Either {
    map(fn) {
        return Either.of(fn(this.value))
    }
    getOrElse(other) {
        return this.value
    }
    orElse() {
        return this
    }
    chain(fn) {
        return fn(this.value)
    }
    getOrElseThrow() {
        return this.value
    }
    filter(fn) {
        return Either.fromNullable(fn(this.value) ? this.value : null)
    }
}

export const tryCatch = f => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
}