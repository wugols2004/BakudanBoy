(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":4}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":5}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":6}],4:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":14,"../../modules/es6.object.create":69}],5:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":14,"../../modules/es6.object.set-prototype-of":70}],6:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":14,"../modules/es6.object.to-string":71,"../modules/es6.promise":72,"../modules/es6.string.iterator":73,"../modules/web.dom.iterable":74}],7:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],8:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],9:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],10:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":31}],11:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":59,"./_to-iobject":61,"./_to-length":62}],12:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":13,"./_wks":66}],13:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],14:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],15:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":7}],16:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],17:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":21}],18:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":23,"./_is-object":31}],19:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],20:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":14,"./_ctx":15,"./_global":23,"./_hide":25}],21:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],22:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":10,"./_ctx":15,"./_is-array-iter":30,"./_iter-call":32,"./_to-length":62,"./core.get-iterator-method":67}],23:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],24:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],25:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":17,"./_object-dp":41,"./_property-desc":48}],26:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":23}],27:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":17,"./_dom-create":18,"./_fails":21}],28:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],29:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":13}],30:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":37,"./_wks":66}],31:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],32:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":10}],33:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":25,"./_object-create":40,"./_property-desc":48,"./_set-to-string-tag":53,"./_wks":66}],34:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":20,"./_has":24,"./_hide":25,"./_iter-create":33,"./_iterators":37,"./_library":38,"./_object-gpo":44,"./_redefine":50,"./_set-to-string-tag":53,"./_wks":66}],35:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":66}],36:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],37:[function(require,module,exports){
module.exports = {};
},{}],38:[function(require,module,exports){
module.exports = true;
},{}],39:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":13,"./_global":23,"./_task":58}],40:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":10,"./_dom-create":18,"./_enum-bug-keys":19,"./_html":26,"./_object-dps":42,"./_shared-key":54}],41:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":10,"./_descriptors":17,"./_ie8-dom-define":27,"./_to-primitive":64}],42:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":10,"./_descriptors":17,"./_object-dp":41,"./_object-keys":46}],43:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":17,"./_has":24,"./_ie8-dom-define":27,"./_object-pie":47,"./_property-desc":48,"./_to-iobject":61,"./_to-primitive":64}],44:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":24,"./_shared-key":54,"./_to-object":63}],45:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":11,"./_has":24,"./_shared-key":54,"./_to-iobject":61}],46:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":19,"./_object-keys-internal":45}],47:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],48:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],49:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":25}],50:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":25}],51:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":10,"./_ctx":15,"./_is-object":31,"./_object-gopd":43}],52:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":14,"./_descriptors":17,"./_global":23,"./_object-dp":41,"./_wks":66}],53:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":24,"./_object-dp":41,"./_wks":66}],54:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":55,"./_uid":65}],55:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":23}],56:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":7,"./_an-object":10,"./_wks":66}],57:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":16,"./_to-integer":60}],58:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":13,"./_ctx":15,"./_dom-create":18,"./_global":23,"./_html":26,"./_invoke":28}],59:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":60}],60:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],61:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":16,"./_iobject":29}],62:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":60}],63:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":16}],64:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":31}],65:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],66:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":23,"./_shared":55,"./_uid":65}],67:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":12,"./_core":14,"./_iterators":37,"./_wks":66}],68:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":8,"./_iter-define":34,"./_iter-step":36,"./_iterators":37,"./_to-iobject":61}],69:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":20,"./_object-create":40}],70:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":20,"./_set-proto":51}],71:[function(require,module,exports){

},{}],72:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":7,"./_an-instance":9,"./_classof":12,"./_core":14,"./_ctx":15,"./_export":20,"./_for-of":22,"./_global":23,"./_is-object":31,"./_iter-detect":35,"./_library":38,"./_microtask":39,"./_redefine-all":49,"./_set-species":52,"./_set-to-string-tag":53,"./_species-constructor":56,"./_task":58,"./_wks":66}],73:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":34,"./_string-at":57}],74:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":23,"./_hide":25,"./_iterators":37,"./_wks":66,"./es6.array.iterator":68}],75:[function(require,module,exports){
"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var entity_1 = require("./entity");
var map_1 = require("./map");
var logger_1 = require("../logger");
var Util = require("../util");
var spritesheet_1 = require("../spritesheet");
var monster_manager_1 = require("./monster-manager");
var _BOMB_TIME_OUT = 1200;
var BOMB_STATES;
(function (BOMB_STATES) {
    BOMB_STATES[BOMB_STATES["IDLE"] = 0] = "IDLE";
    BOMB_STATES[BOMB_STATES["EXPLODING"] = 1] = "EXPLODING";
    BOMB_STATES[BOMB_STATES["CLEAN_UP"] = 2] = "CLEAN_UP";
})(BOMB_STATES || (BOMB_STATES = {}));
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["UP"] = 0] = "UP";
    DIRECTION[DIRECTION["DOWN"] = 1] = "DOWN";
    DIRECTION[DIRECTION["LEFT"] = 2] = "LEFT";
    DIRECTION[DIRECTION["RIGHT"] = 3] = "RIGHT";
    DIRECTION[DIRECTION["COUNT"] = 4] = "COUNT";
})(DIRECTION || (DIRECTION = {}));
var BombExplosion = function () {
    function BombExplosion(_tileX, _tileY, _bombLength) {
        this._fireCrossAnim = ['fire_cross_1.png', 'fire_cross_2.png', 'fire_cross_3.png', 'fire_cross_4.png', 'fire_cross_5.png'];
        this._fireDownAnim = ['fire_down_1.png', 'fire_down_2.png', 'fire_down_3.png', 'fire_down_4.png', 'fire_down_5.png'];
        this._fireUpAnim = ['fire_up_1.png', 'fire_up_2.png', 'fire_up_3.png', 'fire_up_4.png', 'fire_up_5.png'];
        this._fireLeftAnim = ['fire_left_1.png', 'fire_left_2.png', 'fire_left_3.png', 'fire_left_4.png', 'fire_left_5.png'];
        this._fireRightAnim = ['fire_right_1.png', 'fire_right_2.png', 'fire_right_3.png', 'fire_right_4.png', 'fire_right_5.png'];
        this._fireExtVerticalAnim = ['fire_ext_ud_1.png', 'fire_ext_ud_2.png', 'fire_ext_ud_3.png', 'fire_ext_ud_4.png', 'fire_ext_ud_5.png'];
        this._fireExtHorizontalAnim = ['fire_ext_lr_1.png', 'fire_ext_lr_2.png', 'fire_ext_lr_3.png', 'fire_ext_lr_4.png', 'fire_ext_lr_5.png'];
        this._bombLength = 1;
        this._currentTick = 0;
        this._animSpeed = 90;
        this._currentAnimIdx = 0;
        this.tileX = -1;
        this.tileY = -1;
        this.screenX = -1;
        this.screenY = -1;
        this._isDone = false;
        this._isReverse = false;
        this._SpriteSheet = spritesheet_1.SpriteSheet.getInstance();
        this._BombExplosionLengthArr = [1, 1, 1, 1 //down
        ];
        this.tileX = _tileX;
        this.tileY = _tileY;
        var vec2 = map_1.MapTile.getInstance().getTileScreenPosition(_tileX, _tileY);
        this.screenX = vec2.x;
        this.screenY = vec2.y;
        this._bombLength = _bombLength;
        this._BombExplosionLengthArr = this._CheckExplosionBounds();
    }
    BombExplosion.prototype.update = function () {
        if (!this._isDone) {
            var time = Date.now();
            if (time - this._currentTick > this._animSpeed) {
                this._currentTick = time;
                if (this._isReverse) {
                    this._currentAnimIdx--;
                    if (this._currentAnimIdx < 0) {
                        this.onAnimEnd();
                        this._isDone = true;
                    }
                } else {
                    this._currentAnimIdx++;
                    if (this._currentAnimIdx >= this._fireCrossAnim.length) {
                        this._currentAnimIdx = this._fireCrossAnim.length - 1;
                        this._isReverse = true;
                    }
                }
            }
            this._CheckBombHit();
        }
    };
    BombExplosion.prototype._CheckBombHit = function () {
        var monsters = monster_manager_1.MonsterManager.getInstance().GetMonsters();
        var player = monster_manager_1.MonsterManager.getInstance().GetPlayers();
        // horizontal
        {
            var leftCnt = this._BombExplosionLengthArr[DIRECTION.LEFT];
            var rightCnt = this._BombExplosionLengthArr[DIRECTION.RIGHT];
            var leftX = leftCnt * 16 * -1;
            var rightX = rightCnt * 16;
            var tileRect_1 = new Util.cRectangle(leftX + this.screenX, this.screenY, rightX + Math.abs(leftX) + 16, 16);
            //Check for Hits
            monsters.forEach(function (monster) {
                if (!monster.isHit) {
                    if (monster.GetHitBounds().within(tileRect_1)) monster.Die();
                }
            });
            if (player.GetHitBounds().within(tileRect_1)) {
                player.Die();
            }
        }
        // verticalsada
        {
            var upCnt = this._BombExplosionLengthArr[DIRECTION.UP];
            var downCnt = this._BombExplosionLengthArr[DIRECTION.DOWN];
            var upX = leftCnt * 16 * -1;
            var downX = downCnt * 16;
            var tileRect_2 = new Util.cRectangle(this.screenX, upX + this.screenY, 16, downX + Math.abs(upX) + 16);
            //Check for Hits
            monsters.forEach(function (monster) {
                if (!monster.isHit) {
                    if (monster.GetHitBounds().within(tileRect_2)) monster.Die();
                }
            });
            if (player.GetHitBounds().within(tileRect_2)) {
                player.Die();
            }
        }
    };
    BombExplosion.prototype.Draw = function (ctx) {
        if (this._isDone) return;
        ctx.save();
        ctx.translate(this.screenX, this.screenY);
        //draw center
        this._SpriteSheet.Draw(0, 0, 1, this._fireCrossAnim[this._currentAnimIdx], ctx);
        //vertical
        for (var i = 1; i <= this._BombExplosionLengthArr[DIRECTION.UP]; i++) {
            if (i === this._bombLength) this._SpriteSheet.Draw(0, -16 * i, 1, this._fireUpAnim[this._currentAnimIdx], ctx);else this._SpriteSheet.Draw(0, -16 * i, 1, this._fireExtVerticalAnim[this._currentAnimIdx], ctx);
        }
        for (var i = 1; i <= this._BombExplosionLengthArr[DIRECTION.DOWN]; i++) {
            if (i === this._bombLength) this._SpriteSheet.Draw(0, 16 * i, 1, this._fireDownAnim[this._currentAnimIdx], ctx);else this._SpriteSheet.Draw(0, 16 * i, 1, this._fireExtVerticalAnim[this._currentAnimIdx], ctx);
        }
        //horizontal
        for (var i = 1; i <= this._BombExplosionLengthArr[DIRECTION.RIGHT]; i++) {
            if (i === this._bombLength) this._SpriteSheet.Draw(16 * i, 0, 1, this._fireRightAnim[this._currentAnimIdx], ctx);else this._SpriteSheet.Draw(16 * i, 0, 1, this._fireExtHorizontalAnim[this._currentAnimIdx], ctx);
        }
        for (var i = 1; i <= this._BombExplosionLengthArr[DIRECTION.LEFT]; i++) {
            if (i === this._bombLength) this._SpriteSheet.Draw(-16 * i, 0, 1, this._fireLeftAnim[this._currentAnimIdx], ctx);else this._SpriteSheet.Draw(-16 * i, 0, 1, this._fireExtHorizontalAnim[this._currentAnimIdx], ctx);
        }
        ctx.restore();
    };
    BombExplosion.prototype.isEnd = function () {
        return this._isDone;
    };
    BombExplosion.prototype._CheckExplosionBounds = function () {
        var boundarray = [0, 0, 0, 0];
        for (var i = 0; i < this._bombLength; i++) {
            var offset = -1 - i;
            var block = map_1.MapTile.getInstance().getTile(this.tileX, this.tileY + offset);
            if (block != map_1.Block.GROUND) {
                if (block == map_1.Block.BREAKBLOCK) {
                    map_1.MapTile.getInstance().DestroyTile(this.tileX, this.tileY + offset);
                }
                break;
            }
            boundarray[DIRECTION.UP]++;
        }
        for (var i = 0; i < this._bombLength; i++) {
            var offset = 1 + i;
            var block = map_1.MapTile.getInstance().getTile(this.tileX, this.tileY + offset);
            if (block != map_1.Block.GROUND) {
                if (block == map_1.Block.BREAKBLOCK) {
                    map_1.MapTile.getInstance().DestroyTile(this.tileX, this.tileY + offset);
                }
                break;
            }
            boundarray[DIRECTION.DOWN]++;
        }
        for (var i = 0; i < this._bombLength; i++) {
            var offset = -1 - i;
            var block = map_1.MapTile.getInstance().getTile(this.tileX + offset, this.tileY);
            if (block != map_1.Block.GROUND) {
                if (block == map_1.Block.BREAKBLOCK) {
                    map_1.MapTile.getInstance().DestroyTile(this.tileX + offset, this.tileY);
                }
                break;
            }
            boundarray[DIRECTION.LEFT]++;
        }
        for (var i = 0; i < this._bombLength; i++) {
            var offset = 1 + i;
            var block = map_1.MapTile.getInstance().getTile(this.tileX + offset, this.tileY);
            if (block != map_1.Block.GROUND) {
                if (block == map_1.Block.BREAKBLOCK) {
                    map_1.MapTile.getInstance().DestroyTile(this.tileX + offset, this.tileY);
                }
                break;
            }
            boundarray[DIRECTION.RIGHT]++;
        }
        logger_1.Logger.getInstance().debug(boundarray);
        return boundarray;
    };
    return BombExplosion;
}();
var Bomb = function (_super) {
    __extends(Bomb, _super);
    function Bomb(_tileX, _tileY) {
        var _this = _super.call(this, 0, 0, 'bomb_1.png', 1) || this;
        _this._bombSprites = ['bomb_1.png', 'bomb_2.png', 'bomb_3.png', 'bomb_2.png'];
        _this.toDelete = false;
        _this._bombLength = 2;
        _this._currentTick = 0;
        _this._animSpeed = 320;
        _this._currentBombIdleIdx = 0;
        _this._kaboom = false;
        _this._bombAnimObj = null;
        _this.currentMapPosition = new Util.Vector2(_tileX, _tileY);
        var vec2 = map_1.MapTile.getInstance().getTileScreenPosition(_tileX, _tileY);
        _this.x = vec2.x;
        _this.y = vec2.y;
        _this.toDelete = false;
        _this._BombTimerStart();
        return _this;
    }
    Bomb.prototype.Update = function (delta) {
        _super.prototype.Update.call(this, delta);
        this._tick();
        if (this._bombAnimObj !== null) this._bombAnimObj.update();
    };
    Bomb.prototype.Draw = function (delta, ctx) {
        _super.prototype.Draw.call(this, delta, ctx);
        if (this._bombAnimObj !== null) this._bombAnimObj.Draw(ctx);
    };
    Bomb.prototype._tick = function () {
        if (this._kaboom) return false;
        var time = Date.now();
        if (time - this._currentTick > this._animSpeed) {
            this.imageName = this._bombSprites[this._currentBombIdleIdx];
            this._currentBombIdleIdx = (this._currentBombIdleIdx + 1) % this._bombSprites.length;
            this._currentTick = time;
            return true;
        }
        return false;
    };
    Bomb.prototype._BombTimerStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.Logger.getInstance().debug("BOMB TIMER STARTED");
                        return [4 /*yield*/, Util.sleep(_BOMB_TIME_OUT)];
                    case 1:
                        _a.sent();
                        logger_1.Logger.getInstance().debug("KABOOM");
                        return [4 /*yield*/, this._processExplosion()];
                    case 2:
                        _a.sent();
                        logger_1.Logger.getInstance().debug("BOMB DELETE");
                        this.toDelete = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Bomb.prototype._processExplosion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new _promise2.default(function (r, e) {
                    try {
                        _this._kaboom = true;
                        _this.imageName = "";
                        _this._currentTick = 0;
                        _this._bombAnimObj = new BombExplosion(_this.currentMapPosition.x, _this.currentMapPosition.y, _this._bombLength);
                        _this._bombAnimObj.onAnimEnd = function () {
                            map_1.MapTile.getInstance().UnMarkTileBomb(_this.x, _this.y);
                            r(true);
                        };
                    } catch (err) {
                        logger_1.Logger.getInstance().error(err.message);
                        e(false);
                    }
                })];
            });
        });
    };
    return Bomb;
}(entity_1.Entity);
var BombManager = function (_super) {
    __extends(BombManager, _super);
    function BombManager() {
        var _this = _super.call(this, 0, 0, "", 0) || this;
        _this._bombs = [];
        _this._MapTile = map_1.MapTile.getInstance();
        _this._MaxBomb = 1;
        return _this;
    }
    BombManager.getInstance = function () {
        if (BombManager._instance == null) {
            BombManager._instance = new BombManager();
        }
        return BombManager._instance;
    };
    BombManager.prototype.SpawnBomb = function (posX, posY) {
        if (this._bombs.length >= this._MaxBomb) return null;
        var vec2 = this._MapTile.getScreenToTilePosition(posX, posY);
        var found = false;
        //check if current tile is valid
        for (var _i = 0, _a = this._bombs; _i < _a.length; _i++) {
            var bomb = _a[_i];
            if (bomb.currentMapPosition.x == vec2.x && bomb.currentMapPosition.y == vec2.y) found = true;
        }
        if (!found) {
            this._bombs.push(new Bomb(vec2.x, vec2.y));
        }
        return this._MapTile.GetTileBounds(vec2.x, vec2.y);
    };
    BombManager.prototype.Update = function (delta) {
        _super.prototype.Update.call(this, delta);
        this._bombs.forEach(function (bomb, idx, bombs) {
            bomb.Update(delta);
            if (bomb.toDelete) {
                bombs.splice(bombs.indexOf(bomb), 1);
            }
        });
    };
    BombManager.prototype.Draw = function (delta, ctx) {
        _super.prototype.Draw.call(this, delta, ctx);
        this._bombs.forEach(function (bomb) {
            bomb.Draw(delta, ctx);
        });
    };
    return BombManager;
}(entity_1.Entity);
BombManager._instance = null;
exports.BombManager = BombManager;

},{"../logger":82,"../spritesheet":83,"../util":88,"./entity":76,"./map":77,"./monster-manager":78,"babel-runtime/core-js/object/create":1,"babel-runtime/core-js/object/set-prototype-of":2,"babel-runtime/core-js/promise":3}],76:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var spritesheet_1 = require("../spritesheet");
var logger_1 = require("../logger");
var Entity = function () {
    function Entity(paramx, paramy, img, textID) {
        this.isVisible = true;
        this.imageName = "";
        this._SpriteSheet = spritesheet_1.SpriteSheet.getInstance();
        this.x = paramx;
        this.y = paramy;
        this.imageName = img;
        this.textureIDX = textID;
    }
    Entity.prototype.Update = function (delta) {};
    Entity.prototype.Draw = function (delta, ctx) {
        if (!this.isVisible || this.imageName === "") return;
        try {
            ctx.save();
            ctx.translate(this.x, this.y);
            this._SpriteSheet.Draw(0, 0, this.textureIDX, this.imageName, ctx);
            ctx.restore();
        } catch (e) {
            logger_1.Logger.getInstance().error("Error drawing [" + this.imageName + "] :" + e.message, this.imageName);
        }
    };
    return Entity;
}();
exports.Entity = Entity;

},{"../logger":82,"../spritesheet":83}],77:[function(require,module,exports){
"use strict";

exports.__esModule = true;
// import  { Entity } from './entity'
var Util = require("../util");
var spritesheet_1 = require("../spritesheet");
var logger_1 = require("../logger");
var Block;
(function (Block) {
    Block[Block["BLOCK"] = 0] = "BLOCK";
    Block[Block["GROUND"] = 1] = "GROUND";
    Block[Block["GROUND2"] = 2] = "GROUND2";
    Block[Block["BREAKBLOCK"] = 3] = "BREAKBLOCK";
    Block[Block["GROUNDBOMB"] = 4] = "GROUNDBOMB";
    Block[Block["GROUNDBOMB_PASS"] = 5] = "GROUNDBOMB_PASS";
})(Block = exports.Block || (exports.Block = {}));
var BreakBlockAnim = function () {
    function BreakBlockAnim(_tileX, _tileY, _onAnimEnd) {
        this._BreakBlockAnim = ['block_break_1.png', 'block_break_2.png', 'block_break_3.png', 'block_break_4.png', 'block_break_5.png'];
        this._currentTick = 0;
        this._animSpeed = 150;
        this._currentAnimIdx = 0;
        this._SpriteSheet = spritesheet_1.SpriteSheet.getInstance();
        this.tileX = -1;
        this.tileY = -1;
        this.screenX = -1;
        this.screenY = -1;
        this._isDone = false;
        this.tileX = _tileX;
        this.tileY = _tileY;
        var vec2 = MapTile.getInstance().getTileScreenPosition(_tileX, _tileY);
        this.screenX = vec2.x;
        this.screenY = vec2.y;
        this.onAnimEnd = _onAnimEnd;
    }
    BreakBlockAnim.prototype.update = function () {
        if (this._isDone) return;
        var time = Date.now();
        if (time - this._currentTick > this._animSpeed) {
            this._currentTick = time;
            this._currentAnimIdx++;
            if (this._currentAnimIdx >= this._BreakBlockAnim.length) {
                this.onAnimEnd(this);
                this._isDone = true;
            }
        }
    };
    BreakBlockAnim.prototype.Draw = function (ctx) {
        this.update();
        if (this._isDone || this._currentAnimIdx >= this._BreakBlockAnim.length) return;
        ctx.save();
        ctx.translate(this.screenX, this.screenY);
        this._SpriteSheet.Draw(0, 0, 1, this._BreakBlockAnim[this._currentAnimIdx], ctx);
        ctx.restore();
    };
    return BreakBlockAnim;
}();
var MapTile = function () {
    function MapTile(maptileoption) {
        this._defaultMapTileOption = {
            width: 21,
            height: 15,
            tileWidth: 16,
            tileHeight: 16,
            breakBlockChance: 10,
            blockImg: 'blocks_02.png',
            groundImg: 'blocks_04.png',
            ground2Img: 'blocks_05.png',
            breakableImg: 'blocks_03.png'
        };
        this._mapData = [];
        this._logger = logger_1.Logger.getInstance();
        this._blockAnim = [];
        if (MapTile._instance) {
            throw new Error('Logger is a singleton');
        }
        this._initialize(maptileoption);
        MapTile._instance = this;
        return MapTile._instance;
    }
    MapTile.getInstance = function () {
        if (MapTile._instance == null) {
            MapTile._instance = new MapTile();
        }
        return MapTile._instance;
    };
    MapTile.prototype._initialize = function (maptileoption) {
        this._mapOption = Util.extend(this._defaultMapTileOption, maptileoption);
        this._BlockSprites = [this._mapOption.blockImg, this._mapOption.groundImg, this._mapOption.ground2Img, this._mapOption.breakableImg, this._mapOption.groundImg, this._mapOption.groundImg];
        this._mapData.length = 0;
        this._SpriteSheet = spritesheet_1.SpriteSheet.getInstance();
        this.GenerateMap(this._mapOption);
    };
    MapTile.prototype.GenerateMap = function (option) {
        var count = option.width * option.height;
        for (var x = 0; x < count; x++) {
            if (x < this._mapOption.width) {
                this._mapData.push(Block.BLOCK);
            } else if (x % this._mapOption.width == 0) {
                this._mapData.push(Block.BLOCK);
            } else if (this._mapOption.width - x % this._mapOption.width == 1) {
                this._mapData.push(Block.BLOCK);
            } else if (x > this._mapOption.width * (option.height - 1)) {
                this._mapData.push(Block.BLOCK);
            } else {
                var block = Block.BREAKBLOCK;
                var col = x % this._mapOption.width;
                var row = Math.floor(x / option.width);
                if (!(Math.floor(x / this._mapOption.width) % 2) && !(x % this._mapOption.width % 2)) {
                    block = Block.BLOCK;
                } else if (col < 4 && row == 1 || col < 4 && row == this._mapOption.height - 2 || col < this._mapOption.width && col > this._mapOption.width - 5 && row == 1 || col < this._mapOption.width && col > this._mapOption.width - 5 && row == this._mapOption.height - 2 || col == 1 && row < 3 || col == this._mapOption.width - 2 && row < 3 || col == 1 && row > this._mapOption.height - 4 && row < this._mapOption.height || col == this._mapOption.width - 2 && row > this._mapOption.height - 4 && row < this._mapOption.height) {
                    block = Block.GROUND;
                } else {
                    var rand = Math.random() * 100 + 1 > this._mapOption.breakBlockChance;
                    block = rand ? Block.GROUND : Block.BREAKBLOCK;
                }
                this._mapData.push(block);
            }
        }
    };
    MapTile.prototype.Draw = function (delta, ctx) {
        var _this = this;
        this._mapData.forEach(function (tile_value, index) {
            _this._DrawTile(delta, ctx, tile_value, index);
        });
        this._blockAnim.forEach(function (block) {
            block.Draw(ctx);
        });
    };
    MapTile.prototype._DrawTile = function (delta, ctx, tile_value, index) {
        ctx.save();
        var frame = this._SpriteSheet.frames[this._BlockSprites[tile_value]];
        var x = index % this._mapOption.width * frame.w;
        var y = index > 0 ? Math.floor(index / this._mapOption.width) * frame.h : 0;
        ctx.translate(x, y);
        ctx.drawImage(this._SpriteSheet._image[1], frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h);
        ctx.restore();
    };
    MapTile.prototype.getTile = function (x, y) {
        return this._mapData[x + y * this._mapOption.width];
    };
    MapTile.prototype.getTileScreenPosition = function (x, y) {
        var vec2 = { x: 0, y: 0 };
        var index = x + y * this._mapOption.width;
        var frame = this._SpriteSheet.frames[this._BlockSprites[0]];
        vec2.x = index % this._mapOption.width * frame.w;
        vec2.y = index > 0 ? Math.floor(index / this._mapOption.width) * frame.h : 0;
        return vec2;
    };
    MapTile.prototype.getScreenToTilePosition = function (x, y) {
        var vec2 = { x: 0, y: 0 };
        var frame = this._SpriteSheet.frames[this._BlockSprites[0]];
        vec2.x = Math.floor(x / frame.w);
        vec2.y = Math.floor(y / frame.h);
        return vec2;
    };
    MapTile.prototype.checkMoveForCollisionX = function (posX, posY, boundX, boundY, intent) {
        var newposition = posX;
        var collide = true;
        var checkLeftPos = Math.floor((posX + intent) / this._mapOption.tileWidth);
        var checkRightPos = Math.floor((posX + intent + boundX) / this._mapOption.tileWidth);
        // let checkPos = Math.floor((posX + intent + boundX) / this._mapOption.tileWidth);
        var tileY = Math.floor(posY / this._mapOption.tileHeight);
        var tileBottomY = Math.floor((posY + boundY) / this._mapOption.tileHeight);
        if (this._mapData[checkLeftPos + tileY * this._mapOption.width] === Block.GROUND && this._mapData[checkRightPos + tileY * this._mapOption.width] === Block.GROUND && this._mapData[checkLeftPos + tileBottomY * this._mapOption.width] === Block.GROUND && this._mapData[checkRightPos + tileBottomY * this._mapOption.width] === Block.GROUND) {
            newposition += intent;
            collide = false;
        }
        return newposition;
    };
    MapTile.prototype.checkMoveForCollisionY = function (posX, posY, boundX, boundY, intent) {
        var newposition = posY;
        var collide = true;
        var checkTopPos = Math.floor((posY + intent) / this._mapOption.tileWidth);
        var checkBottomPos = Math.floor((posY + intent + boundY) / this._mapOption.tileWidth);
        var tileX = Math.floor(posX / this._mapOption.tileWidth);
        var tileRightX = Math.floor((posX + boundX) / this._mapOption.tileWidth);
        if (this._mapData[tileX + checkTopPos * this._mapOption.width] === Block.GROUND && this._mapData[tileX + checkBottomPos * this._mapOption.width] === Block.GROUND && this._mapData[tileRightX + checkTopPos * this._mapOption.width] === Block.GROUND && this._mapData[tileRightX + checkBottomPos * this._mapOption.width] === Block.GROUND) {
            newposition += intent;
            collide = false;
        }
        return newposition;
    };
    MapTile.prototype.DestroyTile = function (tilex, tiley) {
        var _this = this;
        this._blockAnim.push(new BreakBlockAnim(tilex, tiley, function (block) {
            var idx = _this._blockAnim.indexOf(block);
            _this._blockAnim.splice(idx, 1);
        }));
        this._mapData[tilex + tiley * this._mapOption.width] = Block.GROUND;
    };
    MapTile.prototype.GetTileBounds = function (tilex, tiley) {
        var vec2 = this.getTileScreenPosition(tilex, tiley);
        return new Util.cRectangle(vec2.x, vec2.y, this._mapOption.tileWidth, this._mapOption.tileHeight);
    };
    MapTile.prototype.MarkTileBomb = function (posX, posY) {
        var tile = this.getScreenToTilePosition(posX, posY);
        this._mapData[tile.x + tile.y * this._mapOption.width] = Block.GROUNDBOMB;
        this._logger.debug("MarkTileBomb x {0} y {1}", tile.x, tile.y);
        return this.GetTileBounds(tile.x, tile.y);
    };
    MapTile.prototype.UnMarkTileBomb = function (posX, posY) {
        var tile = this.getScreenToTilePosition(posX, posY);
        this._logger.debug("UnMarkTileBomb x {0} y {1}", tile.x, tile.y);
        if (this._mapData[tile.x + tile.y * this._mapOption.width] !== Block.GROUNDBOMB) throw new Error("tile is not groundbomb");
        this._mapData[tile.x + tile.y * this._mapOption.width] = Block.GROUND;
        return this.GetTileBounds(tile.x, tile.y);
    };
    return MapTile;
}();
MapTile._instance = null;
exports.MapTile = MapTile;

},{"../logger":82,"../spritesheet":83,"../util":88}],78:[function(require,module,exports){
"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var entity_1 = require("./entity");
var map_1 = require("./map");
var logger_1 = require("../logger");
var Util = require("../util");
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["NULL"] = -1] = "NULL";
    DIRECTION[DIRECTION["UP"] = 0] = "UP";
    DIRECTION[DIRECTION["DOWN"] = 1] = "DOWN";
    DIRECTION[DIRECTION["LEFT"] = 2] = "LEFT";
    DIRECTION[DIRECTION["RIGHT"] = 3] = "RIGHT";
    DIRECTION[DIRECTION["COUNT"] = 4] = "COUNT";
})(DIRECTION || (DIRECTION = {}));
var Monster = function (_super) {
    __extends(Monster, _super);
    function Monster(manager, tilex, tiley) {
        var _this = _super.call(this, 0, 0, "front_1_enemy.png", 2) || this;
        _this._offsetPosition = new Util.Vector2(1, -10);
        _this._mapTile = map_1.MapTile.getInstance();
        /**
         * vertical move speed of monster
         * @type {number}
         */
        _this._monsterVectorY = 0;
        /**
         * horizontal move speed of monster
         * @type {number}
         */
        _this._monsterVectorX = 0;
        /**
         * target X screen position of monster movement
         * @type {number}
         */
        _this._monsterTargetX = 0;
        /**
         * target Y screen position of monster movement
         * @type {number}
         */
        _this._monsterTargetY = 0;
        _this._logger = logger_1.Logger.getInstance();
        _this._monsterWidth = 15;
        _this._monsterHeight = 15;
        _this._stopThinking = false;
        _this._maxTileWalk = 10;
        _this.isHit = false;
        _this._moveDirection = DIRECTION.UP;
        _this._maxThinkCount = 0;
        _this._EndGame = null;
        _this._StopMonsters = false;
        _this.Spawn(manager, tilex, tiley);
        return _this;
    }
    Monster.prototype.Spawn = function (manager, tilex, tiley) {
        this._MonsterManager = manager;
        this._currentPosition = this._mapTile.getTileScreenPosition(tilex, tiley);
        this._isHit = false;
        this.UpdatePosition();
        this._Think();
    };
    Monster.prototype.Update = function (delta) {
        _super.prototype.Update.call(this, delta);
        this.UpdatePosition();
    };
    Monster.prototype.UpdatePosition = function () {
        this._currentPosition.x += this._monsterVectorX;
        this._currentPosition.y += this._monsterVectorY;
        if (this._currentPosition.x === this._monsterTargetX && this._currentPosition.y === this._monsterTargetY) {
            this._monsterVectorX = 0;
            this._monsterVectorY = 0;
            this._moveDone();
        }
        this.x = this._currentPosition.x + this._offsetPosition.x;
        this.y = this._currentPosition.y + this._offsetPosition.y;
        ;
    };
    Monster.prototype.StopMonsters = function () {
        this._StopMonsters = true;
        this._moveDone();
    };
    Monster.prototype.Draw = function (delta, ctx) {
        _super.prototype.Draw.call(this, delta, ctx);
    };
    Monster.prototype._Think = function () {
        if (this.isHit || this._StopMonsters) return;
        if (this._maxThinkCount < 4) {
            var currentTilePos = this._mapTile.getScreenToTilePosition(this._currentPosition.x, this._currentPosition.y);
            switch (this._moveDirection) {
                case DIRECTION.UP:
                    var block = this._mapTile.getTile(currentTilePos.x, currentTilePos.y - 1);
                    if (block !== map_1.Block.GROUND) {
                        this._moveDirection = DIRECTION.DOWN;
                        this._maxThinkCount++;
                        this._Think();
                    }
                    break;
                case DIRECTION.DOWN:
                    var block = this._mapTile.getTile(currentTilePos.x, currentTilePos.y + 1);
                    if (block !== map_1.Block.GROUND) {
                        this._moveDirection = DIRECTION.RIGHT;
                        this._maxThinkCount++;
                        this._Think();
                    }
                    break;
                case DIRECTION.RIGHT:
                    var block = this._mapTile.getTile(currentTilePos.x + 1, currentTilePos.y);
                    if (block !== map_1.Block.GROUND) {
                        this._moveDirection = DIRECTION.LEFT;
                        this._maxThinkCount++;
                        this._Think();
                    }
                    break;
                case DIRECTION.LEFT:
                    var block = this._mapTile.getTile(currentTilePos.x - 1, currentTilePos.y);
                    if (block !== map_1.Block.GROUND) {
                        this._moveDirection = DIRECTION.UP;
                        this._maxThinkCount++;
                        this._Think();
                    }
                    break;
                default:
                    // code...
                    // dont go here!!!
                    break;
            }
        } else {
            this._moveDirection = DIRECTION.NULL;
        }
        this._ProcessMovement(this._moveDirection);
    };
    Monster.prototype._ProcessMovement = function (moveDirection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this._MoveToTile(moveDirection)];
                    case 1:
                        _a.sent();
                        this._maxThinkCount = 0;
                        this._Think();
                        return [2 /*return*/];
                }
            });
        });
    };
    Monster.prototype._MoveToTile = function (moveDir) {
        var _this = this;
        return new _promise2.default(function (r, e) {
            try {
                var currentTilePos = _this._mapTile.getScreenToTilePosition(_this._currentPosition.x, _this._currentPosition.y);
                var path = new Util.Vector2(0, 0);
                switch (moveDir) {
                    case DIRECTION.UP:
                        path.y = -1;
                        break;
                    case DIRECTION.DOWN:
                        path.y = 1;
                        break;
                    case DIRECTION.RIGHT:
                        path.x = 1;
                        break;
                    case DIRECTION.LEFT:
                        path.x = -1;
                        break;
                    default:
                        // code...
                        break;
                }
                _this._monsterVectorX = path.x;
                _this._monsterVectorY = path.y;
                var targetVec2 = _this._mapTile.getTileScreenPosition(currentTilePos.x + path.x, currentTilePos.y + path.y);
                _this._monsterTargetX = targetVec2.x;
                _this._monsterTargetY = targetVec2.y;
                _this._moveDone = function () {
                    r(true);
                };
            } catch (err) {
                e(err);
            }
        });
    };
    Monster.prototype.GetHitBounds = function () {
        var rect = new Util.cRectangle(this._currentPosition.x, this._currentPosition.y, this._monsterWidth, this._monsterHeight);
        return rect;
    };
    Monster.prototype.Die = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.Logger.getInstance().debug("Monster Die!");
                        this.isHit = true;
                        this.imageName = "dead_1_enemy.png";
                        return [4 /*yield*/, Util.sleep(1000)];
                    case 1:
                        _a.sent();
                        this._MonsterManager.DeleteMonster(this);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Monster;
}(entity_1.Entity);
exports.Monster = Monster;
var MonsterManager = function () {
    function MonsterManager() {
        this._Monsters = [];
        this._Player = null;
        if (MonsterManager._instance) {
            throw new Error('Logger is a singleton');
        }
        MonsterManager._instance = this;
        return MonsterManager._instance;
    }
    MonsterManager.getInstance = function () {
        if (MonsterManager._instance == null) {
            MonsterManager._instance = new MonsterManager();
        }
        return MonsterManager._instance;
    };
    MonsterManager.prototype.Update = function (delta) {
        var _this = this;
        this._Monsters.forEach(function (monster) {
            monster.Update(delta);
            if (_this._Player.GetHitBounds().collides(monster.GetHitBounds())) {
                _this._Player.Die();
            }
        });
    };
    MonsterManager.prototype.Draw = function (delta, ctx) {
        this._Monsters.forEach(function (monster) {
            monster.Draw(delta, ctx);
        });
    };
    MonsterManager.prototype.SpawnMonster = function (tileX, tileY) {
        this._Monsters.push(new Monster(this, tileX, tileY));
    };
    MonsterManager.prototype.init = function (player, endgame) {
        this._Player = player;
        this._EndGame = endgame;
        this._Monsters.length = 0;
        this.SpawnMonster(1, 13);
        this.SpawnMonster(19, 13);
        this.SpawnMonster(19, 1);
    };
    MonsterManager.prototype.GetMonsters = function () {
        return this._Monsters;
    };
    MonsterManager.prototype.GetPlayers = function () {
        return this._Player;
    };
    MonsterManager.prototype.StopMonsters = function () {
        this._Monsters.forEach(function (monster) {
            monster.StopMonsters();
        });
    };
    MonsterManager.prototype.DeleteMonster = function (monster) {
        var idx = this._Monsters.indexOf(monster);
        this._Monsters[idx].isVisible = false;
        var check = false;
        this._Monsters.forEach(function (monster) {
            if (!check) check = monster.isVisible;
        });
        if (!check) this._EndGame();
    };
    return MonsterManager;
}();
MonsterManager._instance = null;
exports.MonsterManager = MonsterManager;

},{"../logger":82,"../util":88,"./entity":76,"./map":77,"babel-runtime/core-js/object/create":1,"babel-runtime/core-js/object/set-prototype-of":2,"babel-runtime/core-js/promise":3}],79:[function(require,module,exports){
"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var entity_1 = require("./entity");
var map_1 = require("./map");
var logger_1 = require("../logger");
var bomb_manager_1 = require("./bomb-manager");
var Util = require("../util");
var Player = function (_super) {
    __extends(Player, _super);
    function Player(endgame) {
        var _this = _super.call(this, 0, 0, "front_1.png", 0) || this;
        _this._offsetPosition = new Util.Vector2(1, -10);
        _this._mapTile = map_1.MapTile.getInstance();
        _this._playerSpeed = 1;
        _this._logger = logger_1.Logger.getInstance();
        _this._bombManager = bomb_manager_1.BombManager.getInstance();
        _this._playerWidth = 14;
        _this._playerHeight = 14;
        _this._IsDead = false;
        _this._JustBombDroppedRect = null;
        _this._EndGame = null;
        _this._EndGame = endgame;
        _this.Spawn();
        return _this;
    }
    Player.prototype.Spawn = function () {
        this._IsDead = false;
        this.imageName = "front_1.png";
        this._currentPosition = this._mapTile.getTileScreenPosition(1, 1);
        this.UpdatePosition();
    };
    Player.prototype.Update = function (delta) {
        _super.prototype.Update.call(this, delta);
        this.UpdatePosition();
    };
    Player.prototype.MoveUp = function () {
        if (!this._IsDead) this._currentPosition.y = this._mapTile.checkMoveForCollisionY(this._currentPosition.x, this._currentPosition.y, this._playerWidth, this._playerHeight, -this._playerSpeed);
    };
    Player.prototype.MoveDown = function () {
        if (!this._IsDead) this._currentPosition.y = this._mapTile.checkMoveForCollisionY(this._currentPosition.x, this._currentPosition.y, this._playerWidth, this._playerHeight, this._playerSpeed);
    };
    Player.prototype.MoveLeft = function () {
        if (!this._IsDead) this._currentPosition.x = this._mapTile.checkMoveForCollisionX(this._currentPosition.x, this._currentPosition.y, this._playerWidth, this._playerHeight, -this._playerSpeed);
    };
    Player.prototype.MoveRight = function () {
        if (!this._IsDead) this._currentPosition.x = this._mapTile.checkMoveForCollisionX(this._currentPosition.x, this._currentPosition.y, this._playerWidth, this._playerHeight, this._playerSpeed);
    };
    Player.prototype.DropBomb = function () {
        if (!this._IsDead) {
            var justdropped = this._bombManager.SpawnBomb(this._currentPosition.x, this._currentPosition.y);
            if (justdropped !== null) {
                this._JustBombDroppedRect = justdropped;
                if (!this.GetHitBounds().collides(this._JustBombDroppedRect)) {
                    this._mapTile.MarkTileBombPass(this._JustBombDroppedRect.x, this._JustBombDroppedRect.y);
                    this._JustBombDroppedRect = null;
                }
            }
            // if(this._JustBombDroppedRect === null)
            // 	throw new error("this._JustBombDroppedRect is null!", this._JustBombDroppedRect);
        }
    };
    Player.prototype.Die = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.Logger.getInstance().debug("Player Die!");
                        this._IsDead = true;
                        this.imageName = "dead_1.png";
                        return [4 /*yield*/, Util.sleep(1000)];
                    case 1:
                        _a.sent();
                        this._EndGame();
                        return [2 /*return*/];
                }
            });
        });
    };
    Player.prototype.UpdatePosition = function () {
        this.x = this._currentPosition.x + this._offsetPosition.x;
        this.y = this._currentPosition.y + this._offsetPosition.y;
        if (this._JustBombDroppedRect !== null) {
            if (!this.GetHitBounds().collides(this._JustBombDroppedRect)) {
                this._mapTile.MarkTileBomb(this._JustBombDroppedRect.x, this._JustBombDroppedRect.y);
                this._JustBombDroppedRect = null;
            }
        }
    };
    Player.prototype.Draw = function (delta, ctx) {
        _super.prototype.Draw.call(this, delta, ctx);
    };
    Player.prototype.GetHitBounds = function () {
        var rect = new Util.cRectangle(this._currentPosition.x, this._currentPosition.y, this._playerWidth, this._playerHeight);
        return rect;
    };
    return Player;
}(entity_1.Entity);
exports.Player = Player;

},{"../logger":82,"../util":88,"./bomb-manager":75,"./entity":76,"./map":77,"babel-runtime/core-js/object/create":1,"babel-runtime/core-js/object/set-prototype-of":2,"babel-runtime/core-js/promise":3}],80:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var logger_1 = require("./logger");
var window_manager_1 = require("./window-manager");
var spritesheet_1 = require("./spritesheet");
var index_1 = require("./states/index");
var Game = function () {
    function Game(options) {
        var _this = this;
        this._lastTime = Date.now();
        this._timeScale = 1;
        this._logger = logger_1.Logger.getInstance();
        this._logger.debug("starting up the engine...");
        this.windowManager = new window_manager_1.WindowManager(options);
        this.spritesheet = new spritesheet_1.SpriteSheet(options.spriteSheetUrl);
        this._timeScale = options.timeScale;
        this.spritesheet.load().then(function () {
            _this.start();
        });
    }
    Game.prototype.start = function () {
        this._currentState = new index_1.MainGame();
        this._currentTick = 0;
        this._update();
    };
    Game.prototype._update = function () {
        var elapsed = Math.floor(Date.now() - this._lastTime) || 1;
        var delta = elapsed * this._timeScale;
        this._currentState.Update(delta);
        this._currentState.Draw(delta, this.windowManager.ctx);
        requestAnimationFrame(this._update.bind(this));
    };
    return Game;
}();
exports.Game = Game;

},{"./logger":82,"./spritesheet":83,"./states/index":84,"./window-manager":89}],81:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var InputController = function () {
    function InputController(options) {
        var _this = this;
        this._InputOptions = options;
        this._keyPressed = [];
        this._keyPressed[87 /* UP */] = false;
        this._keyPressed[83 /* DOWN */] = false;
        this._keyPressed[65 /* LEFT */] = false;
        this._keyPressed[68 /* RIGHT */] = false;
        this._keyPressed[32 /* BOMB */] = false;
        this._keyPressed[27 /* ESC */] = false;
        window.addEventListener('keydown', function (e) {
            _this._KeyDownCallback(e);
        });
        window.addEventListener('keyup', function (e) {
            _this._KeyUpCallback(e);
        });
    }
    InputController.prototype.Update = function () {
        if (this._keyPressed[87 /* UP */]) this._InputOptions.Up_KeyDown();
        if (this._keyPressed[83 /* DOWN */]) this._InputOptions.Down_KeyDown();
        if (this._keyPressed[65 /* LEFT */]) this._InputOptions.Left_KeyDown();
        if (this._keyPressed[68 /* RIGHT */]) this._InputOptions.Right_KeyDown();
        if (this._keyPressed[32 /* BOMB */]) this._InputOptions.BOMB_KeyDown();
        if (this._keyPressed[27 /* ESC */]) this._InputOptions.ESC_KeyDown();
    };
    InputController.prototype._KeyDownCallback = function (e) {
        var kcode = e.which || e.keyCode;
        this._keyPressed[kcode] = true;
    };
    InputController.prototype._KeyUpCallback = function (e) {
        var kcode = e.which || e.keyCode;
        this._keyPressed[kcode] = false;
    };
    InputController.prototype.clearInputs = function () {
        this._InputOptions = null;
    };
    return InputController;
}();
exports.InputController = InputController;

},{}],82:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["Fatal"] = 4] = "Fatal";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = function () {
    function Logger() {
        this.defaultLevel = LogLevel.Info;
        if (Logger._instance) {
            throw new Error('Logger is a singleton');
        }
        Logger._instance = this;
        return Logger._instance;
    }
    Logger.getInstance = function () {
        if (Logger._instance == null) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    };
    Logger.prototype._log = function (level, args) {
        if (level == null) {
            level = this.defaultLevel;
        }
        // Create a new console args array
        var consoleArgs = [];
        consoleArgs.unshift.apply(consoleArgs, args);
        consoleArgs.unshift('[' + LogLevel[level] + '] : ');
        if (level < LogLevel.Warn) {
            // Call .log for Debug/Info
            if (console.log.apply) {
                // this is required on some older browsers that don't support apply on console.log :(
                console.log.apply(console, consoleArgs);
            } else {
                console.log(consoleArgs.join(' '));
            }
        } else if (level < LogLevel.Error) {
            // Call .warn for Warn
            if (console.warn.apply) {
                console.warn.apply(console, consoleArgs);
            } else {
                console.warn(consoleArgs.join(' '));
            }
        } else {
            // Call .error for Error/Fatal
            if (console.error.apply) {
                console.error.apply(console, consoleArgs);
            } else {
                console.error(consoleArgs.join(' '));
            }
        }
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(LogLevel.Debug, args);
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(LogLevel.Info, args);
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(LogLevel.Warn, args);
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(LogLevel.Error, args);
    };
    Logger.prototype.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(LogLevel.Fatal, args);
    };
    return Logger;
}();
Logger._instance = null;
exports.Logger = Logger;

},{}],83:[function(require,module,exports){
"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Utils = require("./util");
var logger_1 = require("./logger");
var SpriteSheet = function () {
    function SpriteSheet(url) {
        this.frames = {};
        this._image = [];
        this._imageUrls = [];
        this._jsonUrls = [];
        this._logger = logger_1.Logger.getInstance();
        if (SpriteSheet._instance) {
            throw new Error('SpriteSheet is a singleton');
        }
        this._imageUrls = url;
        var tempurl = url;
        for (var _i = 0, tempurl_1 = tempurl; _i < tempurl_1.length; _i++) {
            var x = tempurl_1[_i];
            x = x.replace(".png", "") + ".json";
            this._jsonUrls.push(x);
        }
        SpriteSheet._instance = this;
        return SpriteSheet._instance;
    }
    SpriteSheet.getInstance = function () {
        if (SpriteSheet._instance == null) {
            SpriteSheet._instance = new SpriteSheet(['']);
        }
        return SpriteSheet._instance;
    };
    SpriteSheet.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, jsonUrl, j, _b, _c, imageUrl, _d, _e, _f, err_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 9,, 10]);
                        this._logger.debug('start loading spritesheet json..');
                        _i = 0, _a = this._jsonUrls;
                        _g.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        jsonUrl = _a[_i];
                        this._logger.debug('loading spritesheet json: ' + jsonUrl);
                        return [4 /*yield*/, Utils.getXMLRequest(jsonUrl)];
                    case 2:
                        j = _g.sent();
                        this._onRead(JSON.parse(j));
                        _g.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this._logger.debug('start loading spritesheet png..');
                        _b = 0, _c = this._imageUrls;
                        _g.label = 5;
                    case 5:
                        if (!(_b < _c.length)) return [3 /*break*/, 8];
                        imageUrl = _c[_b];
                        this._logger.debug('loading spritesheet png: ' + imageUrl);
                        _e = (_d = this._image).push;
                        return [4 /*yield*/, this._loadImage(imageUrl)];
                    case 6:
                        _e.apply(_d, [_g.sent()]);
                        _g.label = 7;
                    case 7:
                        _b++;
                        return [3 /*break*/, 5];
                    case 8:
                        this._logger.debug(this._image);
                        this._logger.debug('finished loading spritesheets..');
                        return [3 /*break*/, 10];
                    case 9:
                        err_1 = _g.sent();
                        this._logger.debug('error loading spritesheet..' + err_1.message);
                        return [3 /*break*/, 10];
                    case 10:
                        return [2 /*return*/];
                }
            });
        });
    };
    SpriteSheet.prototype._loadImage = function (url) {
        return new _promise2.default(function (resolve, reject) {
            var img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                reject(null);
            };
            img.src = url;
        });
    };
    SpriteSheet.prototype._onRead = function (data) {
        var temp_frame;
        for (var frame_name in data.frames) {
            var sprite_data = data.frames[frame_name];
            temp_frame = new Utils.cRectangle(sprite_data.frame.x, sprite_data.frame.y, sprite_data.frame.w, sprite_data.frame.h);
            this.frames[frame_name] = temp_frame;
        }
    };
    SpriteSheet.prototype.Draw = function (x, y, texture, spritename, ctx) {
        try {
            ctx.drawImage(this._image[texture], this.frames[spritename].x, this.frames[spritename].y, this.frames[spritename].w, this.frames[spritename].h, x, y, this.frames[spritename].w, this.frames[spritename].h);
        } catch (err) {
            logger_1.Logger.getInstance().error("error drawing " + spritename);
        }
    };
    return SpriteSheet;
}();
SpriteSheet._instance = null;
exports.SpriteSheet = SpriteSheet;

},{"./logger":82,"./util":88,"babel-runtime/core-js/promise":3}],84:[function(require,module,exports){
"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
exports.__esModule = true;
__export(require("./state"));
__export(require("./titlescreen"));
__export(require("./maingame"));

},{"./maingame":85,"./state":86,"./titlescreen":87}],85:[function(require,module,exports){
"use strict";

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();
exports.__esModule = true;
var state_1 = require("./state");
var map_1 = require("../entities/map");
var player_1 = require("../entities/player");
var input_1 = require("../input");
var bomb_manager_1 = require("../entities/bomb-manager");
var monster_manager_1 = require("../entities/monster-manager");
var window_manager_1 = require("../window-manager");
var logger_1 = require("../logger");
var MainGame = function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        var _this = _super.call(this) || this;
        _this._BombManager = bomb_manager_1.BombManager.getInstance();
        _this._MonsterManager = monster_manager_1.MonsterManager.getInstance();
        _this._WindowManager = window_manager_1.WindowManager.getInstance();
        _this._isPause = false;
        _this._mouseDownListener = null;
        _this._MapTile = map_1.MapTile.getInstance();
        _this.addEntities(_this._BombManager);
        _this._Player = new player_1.Player(function () {
            _this.EndGame();
        });
        _this.addEntities(_this._Player);
        _this._InputController = new input_1.InputController({
            Up_KeyDown: function Up_KeyDown() {
                _this._Player.MoveUp();
            },
            Down_KeyDown: function Down_KeyDown() {
                _this._Player.MoveDown();
            },
            Left_KeyDown: function Left_KeyDown() {
                _this._Player.MoveLeft();
            },
            Right_KeyDown: function Right_KeyDown() {
                _this._Player.MoveRight();
            },
            BOMB_KeyDown: function BOMB_KeyDown() {
                _this._Player.DropBomb();
            },
            ESC_KeyDown: function ESC_KeyDown() {},
            Up_KeyUp: function Up_KeyUp() {
                _this._Player.MoveUp();
            },
            Down_KeyUp: function Down_KeyUp() {
                _this._Player.MoveDown();
            },
            Left_KeyUp: function Left_KeyUp() {
                _this._Player.MoveLeft();
            },
            Right_KeyUp: function Right_KeyUp() {
                _this._Player.MoveRight();
            },
            BOMB_KeyUp: function BOMB_KeyUp() {
                _this._Player.DropBomb();
            },
            ESC_KeyUp: function ESC_KeyUp() {}
        });
        _this._MonsterManager.init(_this._Player, function () {
            _this.EndGame();
        });
        _this._mouseDownListener = function () {
            _this.InitGame();
        };
        return _this;
    }
    MainGame.prototype.EndGame = function () {
        this._isPause = true;
        this._MonsterManager.StopMonsters();
        window.addEventListener("mousedown", this._mouseDownListener);
    };
    MainGame.prototype.InitGame = function () {
        var _this = this;
        logger_1.Logger.getInstance().debug("Init Game..");
        this._isPause = false;
        this._Player.Spawn();
        this._MonsterManager.init(this._Player, function () {
            _this.EndGame();
        });
        window.removeEventListener("mousedown", this._mouseDownListener);
    };
    MainGame.prototype.Update = function (delta) {
        _super.prototype.Update.call(this, delta);
        if (!this._isPause) {
            this._MonsterManager.Update(delta);
            this._InputController.Update();
        }
    };
    MainGame.prototype.Draw = function (delta, ctx) {
        this._MapTile.Draw(delta, ctx);
        _super.prototype.Draw.call(this, delta, ctx);
        this._MonsterManager.Draw(delta, ctx);
        if (this._isPause) {
            ctx.save();
            ctx.font = "25px Arial";
            var centerX = this._WindowManager.canvasWidth / 2;
            var centerY = this._WindowManager.canvasHeight / 2;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over!", centerX, centerY - 50);
            ctx.strokeText("Game Over!", centerX, centerY - 50);
            ctx.fillText("Click on screen to play again", centerX, centerY);
            ctx.strokeText("Click on screen to play again", centerX, centerY);
            ctx.restore();
        }
    };
    return MainGame;
}(state_1.State);
exports.MainGame = MainGame;

},{"../entities/bomb-manager":75,"../entities/map":77,"../entities/monster-manager":78,"../entities/player":79,"../input":81,"../logger":82,"../window-manager":89,"./state":86,"babel-runtime/core-js/object/create":1,"babel-runtime/core-js/object/set-prototype-of":2}],86:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var State = function () {
    function State() {
        this.entities = [];
    }
    State.prototype.Exit = function () {
        this.entities.length = 0;
    };
    State.prototype.addEntities = function (entity) {
        return this.entities.push(entity);
    };
    State.prototype.removeEntities = function (entity) {
        var index = this.entities.indexOf(entity, 0);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
        return this.entities.length;
    };
    State.prototype.Update = function (delta) {
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.Update(delta);
        }
    };
    State.prototype.Draw = function (delta, ctx) {
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.Draw(delta, ctx);
        }
    };
    return State;
}();
exports.State = State;

},{}],87:[function(require,module,exports){
"use strict";

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();
exports.__esModule = true;
var state_1 = require("./state");
var entity_1 = require("../entities/entity");
var TitleScreen = function (_super) {
    __extends(TitleScreen, _super);
    function TitleScreen() {
        var _this = _super.call(this) || this;
        _this.SprTitleScreen = new entity_1.Entity(0, 0, 'titlescreen/background.png');
        _this.addEntities(_this.SprTitleScreen);
        return _this;
    }
    TitleScreen.prototype.Update = function (delta) {
        _super.prototype.Update.call(this, delta);
    };
    TitleScreen.prototype.Draw = function (delta, ctx) {
        _super.prototype.Draw.call(this, delta, ctx);
    };
    return TitleScreen;
}(state_1.State);
exports.TitleScreen = TitleScreen;

},{"../entities/entity":76,"./state":86,"babel-runtime/core-js/object/create":1,"babel-runtime/core-js/object/set-prototype-of":2}],88:[function(require,module,exports){
"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.__esModule = true;
var logger_1 = require("./logger");
/**
 * https://developers.google.com/web/fundamentals/getting-started/primers/promises
 * @param  {string}       url [description]
 * @return {Promise<any>}     [description]
 */
function getXMLRequest(url) {
    // Return a new promise.
    return new _promise2.default(function (resolve, reject) {
        // Do the usual XHR stuff
        var logger = logger_1.Logger.getInstance();
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
            // This is called even on 404 etc
            // so check the status
            if (req.readyState === XMLHttpRequest.DONE && req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            } else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful erro
                reject(Error(req.statusText));
            }
        };
        // Handle network errors
        req.onerror = function () {
            reject(Error("Network Error"));
        };
        // Make the request
        req.send();
    });
}
exports.getXMLRequest = getXMLRequest;
var Vector2 = function () {
    function Vector2(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    return Vector2;
}();
exports.Vector2 = Vector2;
var cRectangle = function () {
    function cRectangle(x, y, w, h) {
        if (x === void 0) {
            x = 0;
        }
        if (y === void 0) {
            y = 0;
        }
        if (w === void 0) {
            w = 1;
        }
        if (h === void 0) {
            h = 1;
        }
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    cRectangle.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    cRectangle.prototype.within = function (outer_rect) {
        if (outer_rect.x > this.x) {
            // this is not in it;
            return false;
        } else if (outer_rect.y > this.y) {
            return false;
        } else if (outer_rect.x + outer_rect.w < this.x + this.w) {
            return false;
        } else if (outer_rect.y + outer_rect.h < this.y + this.h) {
            return false;
        }
        return true;
    };
    cRectangle.prototype.collides = function (outer_rect) {
        // Logger.getInstance().debug(this, outer_rect);
        return !(this.y + this.h < outer_rect.y || this.y > outer_rect.y + outer_rect.h || this.x > outer_rect.x + outer_rect.w || this.x + this.w < outer_rect.x);
    };
    return cRectangle;
}();
exports.cRectangle = cRectangle;
/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 * @type {[type]}
 */
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
exports.extend = extend;
/** basic sleep function to be used for async functions */
function sleep(ms) {
    if (ms === void 0) {
        ms = 0;
    }
    return new _promise2.default(function (r) {
        return setTimeout(r, ms);
    });
}
exports.sleep = sleep;
function SortArray(values) {
    return values.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
}
exports.SortArray = SortArray;
function CircleCollision(obj1, obj2, rad1, rad2) {
    var hit = false;
    // Get distance with Pythagoras
    var squaredist = obj1.x * obj2.x + obj1.y * obj2.y;
    hit = squaredist <= (rad1 + rad2) * (rad1 + rad2);
    return hit;
}
exports.CircleCollision = CircleCollision;

},{"./logger":82,"babel-runtime/core-js/promise":3}],89:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var logger_1 = require("./logger");
var WindowManager = function () {
    function WindowManager(options) {
        if (WindowManager._instance) {
            throw new Error('Logger is a singleton');
        }
        this._options = options;
        this._logger = logger_1.Logger.getInstance();
        this._initialize();
        WindowManager._instance = this;
        return WindowManager._instance;
    }
    WindowManager.getInstance = function () {
        if (WindowManager._instance == null) {
            WindowManager._instance = new WindowManager();
        }
        return WindowManager._instance;
    };
    WindowManager.prototype._initialize = function () {
        var _this = this;
        this.canvasElementId = this._options.canvasElementId;
        if (this._options.canvasElementId) {
            this._logger.debug('Using Canvas element specified: ' + this._options.canvasElementId);
            this.canvas = document.getElementById(this._options.canvasElementId);
        } else {
            this._logger.debug('Using generated canvas element');
            this.canvas = document.createElement('canvas');
        }
        if (this._options.width && this._options.height) {
            this._logger.debug('Engine viewport is size ' + this._options.width + ' x ' + this._options.height);
            this.canvasWidth = this._options.width;
            this.canvasHeight = this._options.height;
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
        }
        this.ctx = this.canvas.getContext('2d');
        if (!this.canvasElementId) {
            document.body.appendChild(this.canvas);
        }
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        // this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        window.addEventListener('resize', function () {
            _this._onResize();
        }, false);
        this._onResize();
    };
    WindowManager.prototype._onResize = function () {
        if (window.innerWidth / window.innerHeight < 1.4) return;
        var height = window.innerHeight;
        var ratio = this.canvas.width / this.canvas.height;
        var width = height * ratio;
        document.getElementById("canvas-game").style.width = width + 'px';
        document.getElementById("canvas-game").style.height = height + 'px';
    };
    return WindowManager;
}();
WindowManager._instance = null;
exports.WindowManager = WindowManager;

},{"./logger":82}],90:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var game_1 = require("./engine/game");
console.log('Welcome to Bakudan Boy!');
var myGame = new game_1.Game({
    width: 336,
    height: 240,
    canvasElementId: 'canvas-game',
    spriteSheetUrl: ['/assets/image/bakudanboy.png', '/assets/image/blocks.png', '/assets/image/enemy.png'],
    timeScale: 1
});

},{"./engine/game":80}]},{},[90])

//# sourceMappingURL=bundle.js.map
