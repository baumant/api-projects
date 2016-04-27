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



