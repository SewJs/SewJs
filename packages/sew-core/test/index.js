const SewJs = require('../lib/index.js');

var dummy = {};
var sewjs = SewJs(dummy);
dummy.hello = '';
sewjs.link('hello', dummy, 'hello', function(a) {
    return a === 'world' ? 'works' : 'nah';
})
sewjs.hello = 'world';
