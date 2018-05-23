(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'phaser'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('phaser'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Phaser);
    global.main = mod.exports;
  }
})(this, function (exports, _phaser) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _phaser2 = _interopRequireDefault(_phaser);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var UpdatePlugin = function (_Phaser$Plugins$Scene) {
    _inherits(UpdatePlugin, _Phaser$Plugins$Scene);

    function UpdatePlugin() {
      _classCallCheck(this, UpdatePlugin);

      return _possibleConstructorReturn(this, (UpdatePlugin.__proto__ || Object.getPrototypeOf(UpdatePlugin)).apply(this, arguments));
    }

    _createClass(UpdatePlugin, [{
      key: 'boot',
      value: function boot() {
        var events = this.systems.events;

        this.gameObjects = new _phaser2.default.Structs.Set();

        events.on('update', this.sceneUpdate, this);
        events.on('shutdown', this.sceneShutdown, this);
        events.once('destroy', this.sceneDestroy, this);
      }
    }, {
      key: 'sceneUpdate',
      value: function sceneUpdate(time, delta) {
        this.gameObjects.iterateLocal('update', time, delta);
      }
    }, {
      key: 'sceneShutdown',
      value: function sceneShutdown() {
        this.gameObjects.clear();
      }
    }, {
      key: 'sceneDestroy',
      value: function sceneDestroy() {
        var events = this.systems.events;

        events.off('update', this.scenePostUpdate, this);
        events.off('shutdown', this.sceneShutdown, this);
        events.off('destroy', this.sceneDestroy, this);

        this.gameObjects = null;
        this.scene = null;
        this.systems = null;
      }
    }, {
      key: 'add',
      value: function add(obj) {
        obj.once('destroy', this.remove, this);
        this.gameObjects.set(obj);
      }
    }, {
      key: 'addMultiple',
      value: function addMultiple(objs) {
        objs.forEach(this.add, this);
      }
    }, {
      key: 'remove',
      value: function remove(obj) {
        obj.off('destroy', this.remove, this);
        this.gameObjects.delete(obj);
      }
    }, {
      key: 'dump',
      value: function dump() {
        // console.log('gameObjects', this.gameObjects.getArray());
        console.log('gameObjects: %s', this.gameObjects.size);
      }
    }]);

    return UpdatePlugin;
  }(_phaser2.default.Plugins.ScenePlugin);

  exports.default = UpdatePlugin;


  _phaser2.default.Plugins.UpdatePlugin = UpdatePlugin;
});
