require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());

app.use(staticMiddleware);

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
