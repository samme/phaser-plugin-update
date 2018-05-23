Phaser 3 Update Plugin
======================

```javascript
new Phaser.Game({
  plugins: {
    scene: [{ key: 'updatePlugin', plugin: Phaser.Plugins.UpdatePlugin, mapping: 'updates' }]
  }
});

// ...

// In scene:
this.updates.add(gameObject);
// or
this.updates.addMultiple([ gameObject ]);
```
