Phaser 3 Update Plugin
======================

Runs a Game Object's `update` method automatically.

```javascript
new Phaser.Game({
  plugins: {
    scene: [{ key: 'updatePlugin', plugin: Phaser.Plugins.UpdatePlugin, mapping: 'updates' }]
  }
});
```

In a scene:

```javascript
this.updates.add(gameObject);
// or
this.updates.addMultiple([ gameObject ]);
```
