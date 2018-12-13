const R = require('ramda')

class Failure {
    constructor(value) {
        this.$value = value
    }
    static of(a) {
        return new Failure(a)
    }
    ap(fx) {
        return fx.isFailure
            ? Failure.of(this.$value.concat(fx.$value))
            : this
    }
    map() {
        return this
    }
    fold(f, _) {
        return f(this.$value)
    }
    get isFailure() {
        return true
    }
}

class Success {
    constructor(value) {
        this.$value = value
    }
    static of(a) {
        return new Success(a)
    }
    ap(fx) {
        return fx.isFailure ? fx : fx.map(this.$value)
    }
    map(fn) {
        return Success.of(fn(this.value))
    }
    fold(_, g) {
        return g(this.$value)
    }
    get isSuccess() {
        return true
    }
}

const returnSuccess = (x) => {
    console.log(x);
    console.log('do something when success')
};// 仅返回 success
// let success = R.curryN(3, returnSuccess);
// console.log('result',
//     Success.of(success)
//         .ap(Success.of(['success']))
//         .ap(Failure.of(['xxx']))
//         .ap(Success.of(['success']))
//         .ap(Failure.of(['ttt']))
//         .ap(Success.of(['success']))
//         .ap(Failure.of(['yyy']))
//         .ap(Success.of(['success']))
//         .ap(Failure.of(['ggg']))
//         .ap(Success.of(['success']))
//         .value
// )



function validateForm(username, pwd, email) {
    let success = R.curryN(3, returnSuccess);// 3 是因为我们正调用 `ap` 3 次。
    return Success.of(success)
        .ap(isUsernameValid(username))   // Failure(['用户名不能是数字'])
        .ap(isPwdLengthCorrect(pwd))
        .ap(ieEmailValid(email))
}

function isUsernameValid(a) {
    return /^(0|[1-9][0-9]*)$/.test(a) ? Failure.of(["用户名不能是数字"]) : Success.of(a)
}

function isPwdLengthCorrect(a) {
    return a.length == 10 ? Success.of(a) : Failure.of(["密码必须是 10 个字符"])
}

function ieEmailValid(a) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(a) ? Success.of(a) : Failure.of(["Email 是无效的"])
}
validateForm('12x', 'pwd1234567', 'xxxx@1.com')
    .fold(x => {
        console.log('show warning', x);
    }, x => {
        console.log('do something')
    })
// // 输出: success
