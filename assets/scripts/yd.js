(function () {
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this ||
        {};
    var ArrayProto = Array.prototype, push = ArrayProto.push;
    var _ = function (obj) {
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    //框架组成以外的核心业务逻辑
    _.throttle = function (fn, wait = 500) {
        let timer;
        return function (...args) {
            if (timer == null) {
                //500ms之内用户只能点击一次 ajax等等
                timer = setTimeout(() => { timer = null }, wait);
                return fn.apply(this, args);
            }
        }
    }
    _.map = function (wrapped, callback) {
        console.log("map");
        console.log("🍊", wrapped);
        console.log("🍎", callback);
    }
    _.each = function (obj, callback) {
        if (Array.isArray(obj)) {
            for (let item of obj) {
                callback && callback.call(_, item);
            }
        }
    };
    _.isFunction = function (obj) {
        return typeof obj == 'function' || false;
    };
    _.functions = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    //obj == _ ->functions ["each","map","mixin"]
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return func.apply(_, args);
            };
        });
        return _;
    };
    _.mixin(_);
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
}());
// _.map([],function(){})
// _([]).map(function)


