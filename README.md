# Short URL JS App + RESTful API

The JS app "Short URL" holds a collection of URLs, accessible with a short code:
 - Add a new URL -> generates a short URL
 - Redirect by short URL to the original URL
 - Statistics: URL | Short URL | Date Created | Visits

## App Details

The app is based on Node.js + Express.js + Pug.
 - It has **no database** and app data is not persistent!

Demo:
 - Web app live demo: https://shorturl.nakov.repl.co
 - RESTful API live demo: https://shorturl.nakov.repl.co/api
 - Play with the code at: https://repl.it/@nakov/shorturl

## RESTful API
The following endpoints are supported:
 - `GET /api` - list all API endpoints
 - `GET /api/urls` - list all shout URLs
 - `GET /api/urls/:shortCode` - finds short URL by given `shortCode`
 - `POST /api/urls` - create a new URL shortcode (post a JSON objects in the request body, e.g. `{"url":"https://cnn.com", "shortCode":"cnn"}`
 - `DELETE /api/urls/:shortCode` - deletes short URL by given `shortCode`
 - `POST /api/urls/visit/:shortCode` - visits short URL by given `shortCode` (increases the visits count)

## Screenshots

![image](https://user-images.githubusercontent.com/1689586/108281638-cb959180-7188-11eb-872a-f8c9bead1cf1.png)

![image](https://user-images.githubusercontent.com/1689586/108281720-eec04100-7188-11eb-9329-fde9ac83946f.png)

![image](https://user-images.githubusercontent.com/1689586/108281760-00a1e400-7189-11eb-9cc0-f2b76fe54dcf.png)

![image](https://user-images.githubusercontent.com/1689586/108353928-632eca80-71f1-11eb-819d-1d0559c69590.png)
