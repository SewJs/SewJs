(function (window) {
    var links = {};
    var obj = null;
    var internalFuncs = {
        link: function(variable, callback, element, transform) {
            if (element === undefined) {
                if (!(variable in links)) {
                    links[variable] = [];
                }
                links[variable].push({'callback' : callback, 'element': null, 'transform': function(a) {return a;}});
            } else if (transform === undefined) {
                if (!(variable in links)) {
                    links[variable] = [];
                }
                links[variable].push({'callback' : callback, 'element': element, 'transform': function(a) {return a;}});
            } else {
                if (!(variable in links)) {
                    links[variable] = [];
                }
                links[variable].push({'callback' : callback, 'element': element, 'transform': transform});
            }
            if (variable in obj) {
                var value = obj[variable];
                for (var i = 0; i < links[variable].length; i++) {
                    var link = links[variable][i];
                    if (typeof link.callback === 'function') {
                        link.callback.call(link.element, link.transform(value), value, null);
                    } else {
                        link.callback[link.element] = link.transform(value);
                    }
                }
            }
        },
        unlink: function(variable, callback, element) {
            var i;
            if (callback === undefined && element === undefined) {
                if (variable in links) {
                    delete links[variable];
                }
            } else if (element === undefined) {
                for (i = 0; i < links[variable].length; i++) {
                    if (links[variable][i].callback === callback) {
                        links[variable].splice(i, 1);
                        i--;
                    }
                }
            } else {
                if (variable in links) {
                    for (i = 0; i < links[variable].length; i++) {
                        if (links[variable][i].callback === callback && links[variable][i].element === element) {
                            links[variable].splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        }
    };
    var SewJs = function (_obj) {
        obj = _obj !== undefined ? Object.assign({}, _obj) : {};
        return new Proxy(obj, {
            get: function(target, prop) {
                if (!(prop in internalFuncs)) {
                    return target[prop];
                } else {
                    return internalFuncs[prop].bind(target);
                }
            },
            set: function(target, prop, value) {
                if (prop in internalFuncs) {
                    console.error('%s is a reserved name', prop);
                } else {
                    var oldValue = target[prop];
                    target[prop] = value;
                    
                    if (prop in links && links[prop].length > 0) {
                        for (var i = 0; i < links[prop].length; i++) {
                            var link = links[prop][i];
                            if (typeof link.callback === 'function') {
                                link.callback.call(link.element, link.transform(value), value, oldValue);
                            } else {
                                link.callback[link.element] = link.transform(value);
                            }
                        }
                    }
                }
            },
        });
    }


    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = SewJs;
    } else {
        console.log('hi');
        window.SewJs = SewJs;
        if (typeof define === "function" && define.amd) {
            define("sewjs", [], function () {
                return SewJs;
            });
        }
    }
})(this);