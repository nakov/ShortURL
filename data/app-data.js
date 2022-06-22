let urls = [];

function seedSampleData() {
  urls.length = 0;
  urls.push({
    url: "https://nakov.com", shortCode: "nak", 
    dateCreated: new Date("2021-02-17T14:41:33"), 
    visits: 160
  });
  urls.push({
      url: "https://selenium.dev", shortCode: "seldev",
      dateCreated: new Date("2021-02-17T22:07:08"),
      visits: 43
  });
  urls.push({
    url: "https://nodejs.org", shortCode: "node",
    dateCreated: new Date("2021-02-19T16:41:56"),
    visits: 86
  });
}

function urlExistsByShortCode(shortCode) {
  let urlExists = urls.some(u => u.shortCode == shortCode);
  return urlExists;
}

function findUrlByShortCode(shortCode) {
  let resultUrl = urls.filter(u => u.shortCode == shortCode);
  if (resultUrl.length == 1)
    return resultUrl[0];
  else
    return {errMsg: `Short code not found: ${shortCode}`}
}

function addUrl(url, shortCode) {
  if (isParamEmpty(url))
    return {errMsg: "URL cannot be empty!"};
  if (isParamEmpty(shortCode))
    return {errMsg: "Short code cannot be empty!"};
  if (! isValidHttpUrl(url))
    return {errMsg: "Invalid URL!"};
  if (! isValidShortCode(shortCode))
    return {errMsg: "Short code holds invalid chars!"};
  if (urlExistsByShortCode(shortCode))
    return {errMsg: "Short code already exists!"};
  let newUrl = {
    url: url,
    shortCode: shortCode,
    dateCreated: new Date(),
    visits: 0,
  };
  urls.push(newUrl);
  return {msg: "Short code added.", url: newUrl};
}

function deleteUrlByShortCode(shortCode) {
  if (urlExistsByShortCode(shortCode)) {
    let urlIndex = urls.findIndex(u => u.shortCode == shortCode);
    urls.splice(urlIndex, 1);
    return {msg: `URL deleted: ${shortCode}`};
  }
  else
    return {errMsg: `Short code not found: ${shortCode}`}
}

function visitUrl(shortCode) {
  let targetUrl = findUrlByShortCode(shortCode);
  if (targetUrl.url) {
    targetUrl.visits++;
    return targetUrl;
  } else return {
    errMsg: "Cannot navigate to given short URL",
    errDetails: `Invalid short URL code: ${shortCode}`
  };
}

function isParamEmpty(p) {
  if (typeof(p) != 'string')
    return true;
  if (p.trim().length == 0)
    return true;
  return false;
}

function isValidHttpUrl(string) {
  try {
    let url = new URL(string);
    return url.protocol === "http:" ||
      url.protocol === "https:";
  } catch (_) {
    return false;  
  }
}

function isValidShortCode(shortCode) {
  return /^[A-Za-z0-9_-]{1,50}$/.test(shortCode);
}

function int2base58(num) {
  const base58chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const base = base58chars.length;
  let result = "";
  while (num > 0) {
    result += base58chars[num % base];
    num = Math.trunc(num / base);
  }
  return result;
}

function generateShortCode() {
  let range = 58 * 58;
  let randNum = Math.trunc(Math.random() * range);
  let ticks = new Date() - new Date("1-1-2021");
  let code = int2base58(ticks) + int2base58(randNum);
  return code;
}

module.exports = {
  urls,
  seedSampleData,
  findUrlByShortCode,
  visitUrl,
  generateShortCode,
  addUrl,
  deleteUrlByShortCode
};
