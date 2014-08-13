define(function () {
  var CallbackGate = {
    init: function () {
      this.callbacks = [];
      this.locks = {};
    },

    addLocks: function () {
      for (var i = 0; i < arguments.length; i++) {
        this.locks[arguments[i]] = true;
      }
    },

    removeLock: function (lock) {
      if (typeof this.locks[lock] !== 'undefined') {
        delete this.locks[lock];
        if (this.isUnlocked()) {
          this.runCallbacks();
        }
      }
    },

    isUnlocked: function () {
      for (var lock in this.locks) {
        return false;
      }
      return true;
    },

    addCallback: function (callback) {
      this.callbacks.push(callback);
    },

    runCallbacks: function () {
      while (this.callbacks.length > 0) {
        var callback = this.callbacks.pop();
        callback();
      }
    }
  };

  return CallbackGate;
});
