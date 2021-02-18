function setup(app, data) {
  app.get('/', function(req, res) {
    let visitors = data.urls.reduce(
      (sum, url) => sum + url.visits, 0);
    let model = { urls: data.urls, visitors };
    res.render('home', model);
  });

  app.get('/urls', function(req, res) {
    let urlsForDisplay = data.urls.map(
      u => data.getUrlForDisplay(req, u));
    urlsForDisplay.forEach(u =>
      u.dateCreatedAsText = date2text(u.dateCreated));
    let model = { urls: urlsForDisplay };
    res.render('urls', model);
  });

  app.get('/go/:code', function(req, res) {
    let result = data.visitUrl(req.params.code);
    if (! result.errMsg) {
      res.redirect(result.url);
    } else {
      return res.render('error', result);
    }
  });

  app.get('/add-url', function(req, res) {
    let generatedCode = data.generateShortCode();
    let model = { url: "", code: generatedCode };
    res.render('add-url', model);
  });

  app.post('/add-url', function(req, res) {
    let result = data.addUrl(req.body.url, req.body.code);
    if (result.errMsg) {
      let model = {
        url: req.body.url, code: req.body.code,
        errMsg: result.errMsg
      };
      return res.render('add-url', model);
    } else {
      res.redirect('/urls');
    }
  });

  function date2text(inputDate) {
    let date = inputDate.toISOString().split('.')[0];
    date = date.replace('T', ' ');
    return date;
  }
}

module.exports = { setup };
