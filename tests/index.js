console.assert(Phaser, 'Phaser');

console.assert(PhaserUpdatePlugin, 'PhaserUpdatePlugin');

var scene = {

  create: function () {
    var sprite1 = this.add.circle(32, 32, 16, 0);
    var sprite2 = this.add.circle(64, 64, 16, 0);
    var sprite3 = this.add.circle(96, 96, 16, 0);
    var sprite4 = this.add.circle(128, 128, 16, 0);
    var sprite5 = this.add.circle(160, 160, 16, 0);

    sprite1.update = function () { this.x++; };
    sprite2.update = function () { this.y++; };
    sprite3.update = function () { this.x++; this.y++; };
    sprite4.update = function () { this.x++; };
    sprite5.update = function () { this.y++; };

    console.log('updates.add');
    this.updates.add(sprite1);
    this.updates.dump();

    console.log('updates.addMultiple');
    this.updates.addMultiple([sprite2, sprite3, sprite4, sprite5]);
    this.updates.dump();

    this.time.delayedCall(3000, function () {
      console.log('updates.remove');
      sprite4.setAlpha(0.6);
      this.updates.remove(sprite4);
      this.updates.dump();

      console.log('sprite.destroy');
      sprite5.destroy();
      this.updates.dump();
    }, null, this);

    this.time.delayedCall(6000, function () {
      this.updates.dump();
      console.log('scene.stop');
      this.scene.stop();
      // console.log('scene.remove');
      // this.scene.remove();
    }, null, this);
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
