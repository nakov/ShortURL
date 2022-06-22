function getUrlForDisplay(httpReq, url) {
  let serverUrl =
    httpReq.protocol + '://' + httpReq.hostname;
  return {
    url: url.url,
    shortCode: url.shortCode,
    shortUrl: serverUrl + "/go/" + url.shortCode,
    dateCreated: date2text(url.dateCreated),
    visits: url.visits      
  };
}

function date2text(inputDate) {
  let date = inputDate.toISOString().split('.')[0];
  date = date.replace('T', ' ');
  return date;
}

module.exports = {
  getUrlForDisplay,
  date2text
};
