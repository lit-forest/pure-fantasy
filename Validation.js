// const Validation = Success || Failure

export const Failure = x => ({
    x,
    map: _ => Failure(x),
    ap: ({ isFailure, x: y }) => isFailure ? Failure(x.concat(y)) : Failure(x),
    fold: (f, _) => f(x),
    isFailure: true,
    inspect: () => `Failure(${x})`
})

export const Success = x => ({
    x,
    map: f => Success(f(x)),
    ap: fx => fx.isFailure ? fx : fx.map(x),
    fold: (_, g) => g(x),
    isSuccess: true,
    inspect: () => `Success(${x})`
})

export const fromNullable = x =>
    x != null ? Success(x) : Failure(x)

export const of = Success
// class Failure {
//     constructor(value) {
//         this.$value = value
//     }
//     static of(a) {
//         return new Failure(a)
//     }
//     ap(fx) {
//         return fx.isFailure
//             ? Failure.of(this.$value.concat(fx.$value))
//             : this
//     }
//     map() {
//         return this
//     }
//     get isFailure() {
//         return true
//     }
//     get value() {
//         return this.$value
//     }
// }

// class Success {
//     constructor(value) {
//         this.$value = value
//     }
//     static of(a) {
//         return new Success(a)
//     }
//     ap(fx) {
//         return fx.isFailure ? fx : fx.map(this.$value)
//     }
//     map(fn) {
//         return Success.of(fn(this.value))
//     }
//     get isSuccess() {
//         return true
//     }
//     get value() {
//         return this.$value
//     }
// }

const returnSuccess = () => 'success';// 仅返回 success
// let success = R.curryN(3, returnSuccess);
// console.log('result',
//     Success(success)
//         .ap(Success(['success']))
//         .ap(Failure(['xxx']))
//         .ap(Success(['success']))
//         .ap(Failure(['ttt']))
//         .ap(Success(['success']))
//         .ap(Failure(['yyy']))
//         .ap(Success(['success']))
//         .ap(Failure(['ggg']))
//         .ap(Success(['success']))
//         .fold(x => x, y => y)
// )

const R = require('ramda')

function validateForm(username, pwd, email) {
    let success = R.curryN(3, returnSuccess);// 3 是因为我们正调用 `ap` 3 次。
    return Success(success)
        .ap(isUsernameValid(username))   // Failure(['用户名不能是数字'])
        .ap(isPwdLengthCorrect(pwd))
        .ap(ieEmailValid(email))
}

function isUsernameValid(a) {
    return /^(0|[1-9][0-9]*)$/.test(a) ? Failure(["用户名不能是数字"]) : Success(a)
}

function isPwdLengthCorrect(a) {
    return a.length == 10 ? Success(a) : Failure(["密码必须是 10 个字符"])
}

function ieEmailValid(a) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(a) ? Success(a) : Failure(["Email 是无效的"])
}
console.log(validateForm('x2', 'pwd1234567', 'xxxx@1.com').fold(x => x, x => x))
//输出: success
