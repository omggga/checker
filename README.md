# Website Checker App

This is a Node.js application that checks the availability of a website by making HTTP requests every 2 minutes. The app uses the Express framework and the node-fetch module to handle HTTP requests and fetch URLs.

When a request is made to the app, it checks if the requested URL is available and returns a JSON response with the status of the website. The app uses the AbortController API to handle long-running requests and set a timeout of 5 seconds to prevent the app from hanging on requests that take too long.

The app also includes a setInterval function that checks the availability of the website every 2 minutes and logs the result to the console.

## Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `node app.js` (or `nodemon app.js` if you have nodemon installed)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
