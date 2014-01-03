define(['callback_gate'], function (CallbackGate) {
  describe("CallbackGate", function () {
    var gate;

    beforeEach(function () {
      (gate = Object.create(CallbackGate)).init();
    });

    describe("callbacks", function () {
      var result;

      beforeEach(function () {
        gate.addCallback(function () {
          result = 4;
        });
      });

      it("sets up the callback to be run by runCallbacks", function () {
        gate.runCallbacks();

        expect(result).toEqual(4);
      });
    });

    describe("isUnlocked", function () {
      it("returns false if there are locks", function () {
        gate.addLocks('foo');

        expect(gate.isUnlocked()).toEqual(false);
      });

      it("returns true if there are no locks", function () {
        expect(gate.isUnlocked()).toEqual(true);
      });
    });

    describe("addLocks", function () {
      beforeEach(function () {
        gate.addLocks('foo', 'bar');
      });

      it("adds locks", function () {
        expect(gate.isUnlocked()).toEqual(false);
      });
    });

    describe("removeLock", function () {
      beforeEach(function () {
        gate.addLocks('foo');
      });

      it("removes a lock", function () {
        gate.removeLock('foo');

        expect(gate.isUnlocked()).toEqual(true);
      });

      it("runs the callbacks after removing the last lock", function () {
        var mock = {
          callback: function () {
            return 4;
          }
        };
        spyOn(mock, 'callback');

        gate.addCallback(mock.callback);
        gate.removeLock('foo');

        expect(mock.callback).toHaveBeenCalled();
      });
    });
  });
});
