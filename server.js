/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import db from './database/initializeDB.js';
import apiRoutes from './server/routes/apiRoutes.js';
import ryanRoutes from './server/routes/ryanRoutes.js';
import carterRoutes from './server/routes/carterRoutes.js';
import nnamdiRoutes from './server/routes/nnamdiRoutes.js';
import dylanRoutes from './server/routes/dylanRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;
const staticFolder = 'client';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
}
app.use(cors(corsOptions));

app.use(express.static(staticFolder));
app.use('/api', apiRoutes);
app.use('/api', ryanRoutes);
app.use('/api', nnamdiRoutes);
app.use('/api', dylanRoutes);

async function bootServer() {
  try {
    // const mysql = await db.sequelizeDB;
    // await mysql.sync();
    app.listen(PORT, () => {
      console.log(`Listening on: http//localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootServer();
