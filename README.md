# mock-n-serve

* when you're setting up the frontend the main task is to setup api call function that connects with backend for the api call. This tasks sometimes gives you errors like CORS, cookie problems etc. With simply changing the baseurl of your API call setup you can test whether your api call is reaching to the backend properly or not.

i.e.
```javascript
const baseUrl = 'https://mock-n-serve.onrender.com';
// const baseUrl = 'https://example.com';

const urlToSetCookie = baseUrl + '/set-cookie?name=token&value=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFyc2giLCJpYXQiOjE1MTYyMzkwMjJ9.nluS3DGKes2Le9eT7sdLpvOOeB9IZ7JVqXOd7rU7jPE';
await fetch(urlToSetCookie);

const apiUrl = baseUrl + '/users?clientType=WEB';

const response = await fetch(apiUrl,{
  method: "POST",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "Response-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Harsh"
  })
});
```
Response object:
```json
{
    "method": "POST",
    "url": "/users?clientType=WEB",
    "body": {
        "name": "Harsh"
    },
    "query": {
        "clientType": "WEB"
    },
    "headers": {
        "response-type": "application/json",
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.31.3",
        "accept": "*/*",
        "postman-token": "fafd9474-1c3b-495b-96d9-8b262fc5aa3f",
        "host": "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "content-length": "23",
        "cookie": "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFyc2giLCJpYXQiOjE1MTYyMzkwMjJ9.nluS3DGKes2Le9eT7sdLpvOOeB9IZ7JVqXOd7rU7jPE"
    },
    "cookies": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFyc2giLCJpYXQiOjE1MTYyMzkwMjJ9.nluS3DGKes2Le9eT7sdLpvOOeB9IZ7JVqXOd7rU7jPE"
    },
    "files": {}
}
```

### special urls

Path: /set-cookie

Query params:
* name ( name of cookie )
* value ( value of cookie )

[ Note: all other allowed cookie parameters of nodejs express can be used through query params. ]


* All urls other than specified above can be used to test api call.

### Headers

* Pass 'response-type' header value 'application/json' to receive the response in json format, Otherwise the response will be in html table format.
* All other headers will be shown