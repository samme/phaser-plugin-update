console.assert(Phaser, 'Phaser');

console.assert(PhaserUpdatePlugin, 'PhaserUpdatePlugin');

var scene = {

  create: function () {
    var sprite1 = this.add.circle(32, 32, 16, 0);
    var sprite2 = this.add.circle(64, 64, 16, 0);
    var sprite3 = this.add.circle(96, 96, 16, 0);
    var sprite4 = this.add.circle(128, 128, 16, 0);
    var sprite5 = this.add.circle(160, 160, 16, 0);

    var scene = this;

    sprite1.update = function () { this.x++; };
    sprite2.update = function () { this.y++; };
    sprite3.update = function () { this.x++; this.y++; };
    sprite4.update = function (time, delta) {
      console.assert((typeof time) === 'number');
      console.assert((typeof delta) === 'number');
      console.log('time, delta', time, delta);
      console.log('remove');

      scene.updates.remove(this);
    };
    sprite5.update = function () {
      console.log('destroy');
      
      this.destroy();
    };

    this.updates.add(sprite1);
    console.assert(this.updates.gameObjects.size === 1);
    console.assert(this.updates.gameObjects.contains(sprite1));

    this.updates.remove(sprite1);
    console.assert(this.updates.gameObjects.size === 0);
    console.assert(!this.updates.gameObjects.contains(sprite1));

    this.updates.addMultiple([sprite2, sprite3, sprite4, sprite5]);
    console.assert(this.updates.gameObjects.size === 4);

    this.time.delayedCall(100, function () {
      console.assert(this.updates.gameObjects.size === 2);
      console.assert(this.updates.gameObjects.contains(sprite2));
      console.assert(this.updates.gameObjects.contains(sprite3));
      console.assert(!this.updates.gameObjects.contains(sprite4));
      console.assert(!this.updates.gameObjects.contains(sprite5));
    }, null, this);

    this.time.delayedCall(3000, function () {
      console.assert(this.updates.gameObjects.size === 2);
      console.log('scene.stop()');
      this.scene.stop();
      // console.log('scene.remove()');
      // this.scene.remove();
    }, null, this);

    this.events.once('shutdown', function () {
      console.log('shutdown');
      console.assert(this.updates.gameObjects.size === 0);
    }, this);
  }
};

new Phaser.Game({

  width: 480, height: 480,

  backgroundColor: 0xdddddd,

  scene: scene,

  plugins: {
    scene: [{ key: 'UpdatePlugin', plugin: PhaserUpdatePlugin, mapping: 'updates' }]
  }

});
