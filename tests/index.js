console.assert(Phaser, 'Phaser');

console.assert(Phaser.Plugins.UpdatePlugin, 'Phaser.Plugins.UpdatePlugin');

var scene = {

  create: function () {
    var sprite1 = this.add.text(32, 32, '1 add');
    var sprite2 = this.add.text(64, 64, '2 add');
    var sprite3 = this.add.text(96, 96, '3 add');
    var sprite4 = this.add.text(128, 128, '4 add');
    var sprite5 = this.add.text(160, 160, '5 add');

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
      sprite4.setText('4 remove');
      this.updates.remove(sprite4);
      this.updates.dump();

      console.log('sprite.destroy');
      sprite5.setText('5 destroy');
      sprite5.destroy();
      this.updates.dump();
    }, null, this);

    this.time.delayedCall(6000, function () {
      console.log('scene.stop');
      this.scene.stop();
      this.updates.dump();
    }, null, this);
  },

  update: function () {
    // this.scene.remove();
  }
};

new Phaser.Game({

  width: 480, height: 480,

  scene: scene,

  plugins: {
    scene: [{ key: 'updatePlugin', plugin: Phaser.Plugins.UpdatePlugin, mapping: 'updates' }]
  }

});
