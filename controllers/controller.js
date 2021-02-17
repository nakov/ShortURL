function setup(app, urls) {
  let code2url = new Map();
  urls.forEach(url => code2url[url.shortCode] = url);

  app.get('/', function(req, res) {
    let visitors = urls.reduce(
      (sum, url) => sum + url.visits, 0);
    let model = { urls, visitors };
    res.render('home', model);
  });

  app.get('/urls', function(req, res) {
    let serverUrl = req.protocol + '://' + req.get('host');
    let model = { urls, serverUrl };
    res.render('urls', model);
  });

  app.get('/go/:code', function(req, res) {
    let targetUrl = code2url[req.params.code];
    if (targetUrl) {
      targetUrl.visits++;
      res.redirect(targetUrl.url);
    } else {
      let model = {
        errMsg: `Error: invalid code!`,
        errHeading: "Cannot navigate to given short URL",
        errDetails: "Invalid short URL code: " + req.params.code
      };
      return res.render('error', model);
    }
  });

  app.get('/add-url', function(req, res) {
    let uniqueCode = int2base58(new Date().getTime());
    let model = { url: "", code: uniqueCode };
    res.render('add-url', model);
  });

  app.post('/add-url', function(req, res) {
    if (paramEmpty(req.body.url))
      return showError("Error: URL cannot be empty!");
    if (paramEmpty(req.body.code))
      return showError("Error: code cannot be empty!");
    if (!validHttpUrl(req.body.url))
      return showError("Error: invalid URL!");
    if (! /^[A-Za-z0-9_-]{1,50}$/.test(req.body.code))
      return showError("Error: code holds invalid chars!");
    if (code2url[req.body.code])
      return showError("Error: code already exists!");
    let newUrl = {
      url: req.body.url,
      shortCode: req.body.code,
      dateCreated: new Date(),
      visits: 0,
    };
    urls.push(newUrl);
    code2url[newUrl.shortCode] = newUrl;
    res.redirect('/urls');

    function showError(errMsg) {
      let model = {
        url: req.body.url, code: req.body.code,
        errMsg
      };
      return res.render('add-url', model);
    }
  });

  function paramEmpty(p) {
    if (typeof(p) != 'string')
      return true;
    if (p.trim().length == 0)
      return true;
    return false;
  }

  function validHttpUrl(string) {
    try {
      let url = new URL(string);
      return url.protocol === "http:" ||
        url.protocol === "https:";
    } catch (_) {
      return false;  
    }
  }

  function int2base58(num) {
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    const base = chars.length;
    let result = "";
    while (num > 0) {
      result += chars[num % base];
      num = Math.trunc(num / base);
    }
    return result;
  }

  Date.prototype.asText = function() {
    let date = this.toISOString().split('.')[0];
    date = date.replace('T', ' ');
    return date;
  }
}

module.exports = { setup };
