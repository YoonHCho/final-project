require('dotenv/config');
// const path = require('path');
const argon2 = require('argon2');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// started for feature 7 user can sign up
// const publicPath = path.join(__dirname, 'public');
// if (process.env.NODE_ENV === 'development') {
//   app.use(require('./dev-middleware')(publicPath));
// }

app.use(express.json());

app.use(staticMiddleware);

app.get('/api/log/', (req, res, next) => {
  const sql = `
    SELECT "logId",
           "log",
           "location",
           "latitude",
           "longitude"
    FROM   "logs";
  `;

  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/log/:id', (req, res, next) => {
  const id = Number(req.params.id);
  if (!id) {
    throw new ClientError(400, 'id must be a positive integer');
  }
  const sql = `
    SELECT "logId",
           "log",
           "location",
           "latitude",
           "longitude"
    FROM   "logs"
    WHERE  "logId" = $1
  `;
  const params = [id];

  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find log with logId ${id}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/photos/:logid', (req, res, next) => {
  const sql = `
    SELECT "image"
    FROM   "photos"
    WHERE  "logId" = $1
  `;

  const logId = Number(req.params.logid);
  if (typeof logId !== 'number' || logId <= 0 || isNaN(logId)) {
    throw new ClientError(400, 'id must be a positive integer');
  }

  const params = [logId];

  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.json(result.rows);
        return;
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/log/', (req, res, next) => {
  const sql = `
  INSERT INTO "logs" ("log", "location", "latitude", "longitude")
  VALUES             ($1, $2, $3, $4)
  RETURNING *
  `;

  const { log, location, latitude, longitude } = req.body;
  if (!log) {
    throw new ClientError(400, 'log is a required field');
  } else if (!location) {
    throw new ClientError(400, 'location is a required field');
  } else if (!latitude) {
    throw new ClientError(400, 'latitude is a required field');
  } else if (!longitude) {
    throw new ClientError(400, 'longitude is a required field');
  }

  const params = [log, location, latitude, longitude];

  db.query(sql, params)
    .then(result => {
      const logCreated = result.rows[0];
      res.status(201).json(logCreated);
    })
    .catch(err => next(err));
});

app.post('/api/upload/', uploadsMiddleware, (req, res, next) => {
  const image = `/images/${req.file.filename}`;
  const sql = `
    INSERT INTO "photos" ("logId", "image")
    VALUES               ($1, $2)
    RETURNING *;
  `;
  const { logId } = req.body;

  if (!logId) {
    throw new ClientError(400, 'logId is a required field');
  } else if (!image) {
    throw new ClientError(400, 'image is a required field');
  }

  const params = [logId, image];
  db.query(sql, params)
    .then(result => {
      const created = result.rows[0];
      res.status(201).json(created);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ClientError(400, 'username, email, and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO "users" ("username", "email", "hashedPassword")
        VALUES              ($1, $2, $3)
        RETURNING "userId", "username", "email", "joinedAt"
      `;
      const params = [username, email, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
