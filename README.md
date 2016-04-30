#API Project
A group of microservices done in Node.js. They include:

* Timestamp Microservice
* Request Header Parser Microservice

##Timestamp Microservice
**Endpoint:** `/api/timestamp`

**User stories:**

1. I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
2. If it does, it returns both the Unix timestamp and the natural language form of that date.
3. If it does not contain a date or Unix timestamp, it returns null for those properties.

**Example usage:**

`https://dry-hamlet-8316.herokuapp.com/January 11, 2001`

`https://dry-hamlet-8316.herokuapp.com/1450137600000`

**Example output:**

`{"unix": 1450137600000,"natural": "December 15, 2015"}`

##Request Header Microservice
**Endpoint:** `/api/whoami`

**User Stories:**

1. I can get the IP address, language and operating system for my browser.

##URL Shortener
**Endpoint:** `/api/shorturl`

**User Stories:**

1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

**Example usage:**

`https://dry-hamlet-8316.herokuapp.com/api/shorturl/http://timothybauman.com`

**Example output:**

`{ "original_url":"http://timothybauman.com", "short_url":"https://dry-hamlet-8316.herokuapp.com/9165" }`

##Image Abstraction Layer
**Endpoint:** `/api/imagesearch`

**User Stories:**

1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
3. I can get a list of the most recently submitted search strings.

**Example usage:**

`https://dry-hamlet-8316.herokuapp.com/api/imagesearch/puppies?offset=2`

`https://dry-hamlet-8316.herokuapp.com/api/latest/imagesearch`

**Example output:**

`{"image":"http://trulyhandpicked.com/wp-content/uploads/2016/03/puppies-puppies-pictures-14593490924k8gn.jpg","alt_text":"its nap time puppies pictures","page_url":"http://trulyhandpicked.com/2016/03/30/boxer-puppies-pictures/"}`

`{"term":"puppies","when":"2016-04-29 | 17:19:59"},{"term":"cats funny","when":"2016-04-29 | 16:50:13"}`

##File Metadata Microservice
**Endpoint:** `/api/metadata`

**User Stories:**

1. I can submit a FormData object that includes a file upload.
2. When I submit something, I will receive the file size in bytes within the JSON response

**Example usage:** `upload file`

**Example output:**

`{"filesize":"72206"}`