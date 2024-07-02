import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import { router } from 'express-file-routing';
import http from 'http';
import https from 'https';
import path from 'path';
import * as dotenv from 'dotenv';
import { LOGGER } from './Logger';

dotenv.config({ override: true });

const certificates = {
  key: fs.readFileSync(path.join('config', 'server.key')),
  cert: fs.readFileSync(path.join('config', 'server.crt'))
};

const app = express().use(bodyParser.json()).use('/', router());

const httpPort = 3000;
http.createServer(app).listen(httpPort, () => {
  LOGGER.log(`server is listening on http://localhost:${httpPort}`);
});

const httpsPort = 3001;
https.createServer(certificates, app).listen(httpsPort, () => {
  LOGGER.log(`server is listening on https://localhost:${httpsPort}\n`);
});
