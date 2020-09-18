require('dotenv').config();

const port = 5200;
const express = require('express');
const pool = require('./database');

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization, Content-Type',
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.get('/getAllMeasurements', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let measurements = await pool.query("SELECT * FROM measurements");

  res.status(200);
  res.send(JSON.stringify(measurements));
})

app.get('/getAllConversions', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let conversions = await pool.query(
    `
    SELECT c.id, c.isGeneric, c.measOneQty, c.measTwoQty, m1.name AS measOneName, m2.name AS measTwoName, i.name AS ingredientName
    FROM conversions as c
    INNER JOIN measurements AS m1 ON m1.id = c.measOneId
    INNER JOIN measurements AS m2 ON m2.id = c.measTwoId
    LEFT JOIN ingredients AS i ON i.id = c.ingredientId
    `
  );

  res.status(200);
  res.send(JSON.stringify(conversions));
})

app.get('/getAllIngredients', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let ingredients = await pool.query(
    `
    SELECT i.id, i.name, m.name AS defaultMeasurement
    FROM ingredients as i
    INNER JOIN measurements AS m ON m.id = i.defaultMeasId
    `
  );

  res.status(200);
  res.send(JSON.stringify(ingredients));
})

app.get('/getAllRecipes', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let recipes = await pool.query("SELECT r.id, r.name, r.directions, r.canMake FROM recipes as r");

  res.status(200);
  res.send(JSON.stringify(recipes));
})

app.get('/getRecipeIngredients', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let recipeId = req.params.recipeId;
  let ingredients = await pool.query(
    `
    SELECT i.name AS ingredient, m.name AS measurement, ri.quantity
    FROM recipe_ingredients AS ri
    INNER JOIN ingredients AS i ON ri.ingredientId = i.id
    INNER JOIN measurements AS m ON ri.measurementId = m.id
    WHERE recipeId = ?
    `
  );

  res.status(200);
  res.send(JSON.stringify(ingredients));
})

app.listen(port, function() {
  console.log("Pantry API is listening on port " + port + ".");
})