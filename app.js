import express from 'express';
import debug from 'debug';
import * as server from './config/server.js';
import { helloRouter } from './routes/hello.js';


// Setup debug module to spit out all messages
// Do `npn start` to see the debug messages
export const codeTrace = debug('moble:server');

// Start the app
export const app = express();
server.setup(app)

// Register any middleware here

// Register routers here
app.use('/hello', helloRouter);

// Start the server
server.errorHandling(app);
app.listen(server.port, () => {
  console.log(`App running at http://127.0.0.1:${server.port}/hello`);
  debug('testing');
});
