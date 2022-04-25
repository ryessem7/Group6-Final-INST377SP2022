import express from 'express';
import sequelize from sequelize
import chalk from 'chalk';
import fetch from 'node-fetch';

import db from '../database/initializeDB.js';
// importing my query -Mario
import reviewsQuery from '../controllers/Reviews_query.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Hispanic Restaurants API!');
}); 

/// /////////////////////////////////
/// //////// Review Endpoints////////// by Mario C
/// /////////////////////////////////

router.get('/review', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(
      'SELECT * FROM Review'
    );
    res.json({data: result});
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.get('/review/:id', async (req, res) => {
  try {
    const {id} = req.params
    const result = await db.sequelizeDB.query(
      `SELECT * FROM Review WHERE review_id = ${id}`
    );
    res.json({data: result});
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

// edited my router to work w/ js file following the lecture format
.post( async (req, res) => {
  try {
    console.dir(req.body, {depth: null});
    console.log(req.body?.idRestaraunt);
    const restarauntIdentified = req.body?.idRestaraunt || 0;
    const result = await db.sequelizeDB.query(reviewsQuery, {
      replacements: {restaurant_id: restarauntIdentified},
      type: sequelize.QueryTypes.SELECT
    });
    res.json({data: result});
  } catch (err) {
    console.log(err);
    res.send({message:err});
  }
});

router.put('/review', async (req, res) => {
  try {
    res.json({message: 'put FoodServices endpoint'});
  } catch (err) {
    console.log(error);
    res.json({error: 'Something went wrong on the server'});
  }
});
router.delete('/review', async (req, res) => {
  try {
    res.json({message: 'delete FoodServices endpoint'});
  } catch (err) {
    console.log(error);
    res.json({error: 'Something went wrong on the server'});
  }
});

export default router;
