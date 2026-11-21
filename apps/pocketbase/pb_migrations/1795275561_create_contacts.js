migrate((app) => {
  let collection;
  try { collection = app.findCollectionByNameOrId('contacts'); } catch (_) {
    collection = new Collection({
      name: 'contacts', type: 'base',
      listRule: null, viewRule: null, createRule: '@request.body.consent = true', updateRule: null, deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true, min: 2, max: 120 },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', max: 30 },
        { name: 'subject', type: 'text', max: 120 },
        { name: 'message', type: 'text', required: true, min: 10, max: 5000 },
        { name: 'consent', type: 'bool', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
      ]
    });
    app.save(collection);
  }
}, (app) => { app.delete(app.findCollectionByNameOrId('contacts')); });
