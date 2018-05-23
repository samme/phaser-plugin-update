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

    console.log('add');
    this.updates.add(sprite1);
    this.updates.dump();

    console.log('addMultiple');
    this.updates.addMultiple([sprite2, sprite3, sprite4, sprite5]);
    this.updates.dump();

    console.log('remove');
    sprite4.setText('4 remove');
    this.updates.remove(sprite4);
    this.updates.dump();

    console.log('destroy');
    sprite5.setText('5 destroy');
    sprite5.destroy();
    this.updates.dump();

    this.time.delayedCall(5000, function () {
      console.log('restart');
      this.scene.restart();
      this.updates.dump();
    }, null, this);
  },

  update: function () {
    // this.scene.remove();
  }
};

new Phaser.Game({

  scene: scene,

  plugins: {
    scene: [{ key: 'updatePlugin', plugin: Phaser.Plugins.UpdatePlugin, mapping: 'updates' }]
  }

});
