function setup(app, data) {
  app.get('/api', function(req, res) {
    let routes = app._router.stack
      .filter(r => r.route && r.route.path.startsWith('/api'))
    .map(rt => ({
      route: rt.route.path,
      method: rt.route.stack[0].method
    }));
    res.send(routes);
  });

  app.get('/api/urls', function(req, res) {
    let result = data.urls.map(
      u => data.getUrlForDisplay(req, u));
    res.send(result);
  });

  app.get('/api/urls/:shortCode', function(req, res) {
    let result = data.findUrlByShortCode(req.params.shortCode);
    if (result.errMsg)
      res.status(404).send(result);
    else
      res.send(data.getUrlForDisplay(req, result));
  });

  app.post('/api/urls', function(req, res) {
    let result = data.addUrl(req.body.url, req.body.shortCode);
    if (result.errMsg)
      res.status(400).send(result);
    else {
      result.url = data.getUrlForDisplay(req, result.url);
      res.send(result);
    }
  });

  app.delete('/api/urls/:shortCode', function(req, res) {
    let result = data.deleteUrlByShortCode(req.params.shortCode);
    if (result.errMsg)
      res.status(404).send(result);
    else
      res.send(result);
  });

  app.post('/api/urls/visit/:shortCode', function(req, res) {
    let result = data.visitUrl(req.params.shortCode);
    if (result.errMsg)
      res.status(404).send(result);
    else
      res.send(data.getUrlForDisplay(req, result));
  });
}

module.exports = { setup };
