Phaser 3 Update Plugin
======================

Runs a Game Object's `update` method automatically.

```javascript
new Phaser.Game({
  plugins: {
    scene: [{ key: 'updatePlugin', plugin: PhaserUpdatePlugin, mapping: 'updates' }]
  }
});
```

In a scene:

```javascript
this.updates.add(gameObject);
// or
this.updates.addMultiple([ gameObject1, gameObject2 ]);
```
