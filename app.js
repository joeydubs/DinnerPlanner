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

  let measurements = await pool.query("SELECT * FROM measurements WHERE measurements.id <> 1");

  res.status(200);
  res.send(JSON.stringify(measurements));
})

app.get('/getAllConversions', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let results = await pool.query(
    `
    SELECT c.isGeneric, c.measOneQty, c.measTwoQty,
    i.id AS ingredientId, i.name AS ingredientName,
    m1.id AS measOneId, m1.name AS measOneName, m1.abbr AS measOneAbbr,
    m2.id AS measTwoId, m2.name AS measTwoName, m2.abbr AS measTwoAbbr
    FROM conversions as c
    INNER JOIN measurements AS m1 ON m1.id = c.measOneId
    INNER JOIN measurements AS m2 ON m2.id = c.measTwoId
    LEFT JOIN ingredients AS i ON i.id = c.ingredientId
    `
  );

  let conversions = [];

  for (result of results) {
    let conversion = {
      ingredient: {
        id: result.ingredientId,
        name: result.ingredientName,
      },
      isGeneric: result.isGeneric,
      measOne: {
        id: result.measOneId,
        name: result.measOneName,
        abbr: result.measOneAbbr
      },
      measOneQty: result.measOneQty,
      measTwo: {
        id: result.measTwoId,
        name: result.measTwoName,
        abbr: result.measTwoAbbr
      },
      measTwoQty: result.measTwoQty
    }

    conversions.push(conversion);
  }

  res.status(200);
  res.send(JSON.stringify(conversions));
})

app.get('/getAllIngredients', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let results = await pool.query(
    `
    SELECT i.id, i.name, m.id AS measId, m.name AS measName, m.abbr AS measAbbr
    FROM ingredients as i
    INNER JOIN measurements AS m ON m.id = i.defaultMeasId
    WHERE i.id <> 1
    `
  );

  let ingredients = [];

  for (let result of results) {
    let ingredient = {
      id: result.id,
      name: result.name,
      defaultMeasurement: {
        id: result.measId,
        name: result.measName,
        abbr: result.abbr
      }
    }

    ingredients.push(ingredient);
  }

  res.status(200);
  res.send(ingredients);
})

app.get('/getAllRecipes', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let recipes = await pool.query("SELECT r.id, r.name, r.directions, r.canMake FROM recipes as r");

  res.status(200);
  res.send(JSON.stringify(recipes));
})

app.get('/getAllPantryItems', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let pantryItems = await pool.query(
    `
    SELECT qoh, i.id AS ingredientId, i.name AS ingredientName,
      m.id AS defaultMeasId, m.name AS measName, m.abbr AS measAbbr
    FROM pantry AS p
    INNER JOIN ingredients AS i ON p.ingredientId = i.id
    INNER JOIN measurements AS m ON i.defaultMeasId = m.id
    `
  );

  let pantry = [];

  for (let item of pantryItems) {
    let pantryItem = {
      ingredient: {
        id: item.ingredientId,
        name: item.ingredientName,
        defaultMeasurement: {
          id: item.defaultMeasId,
          name: item.measName,
          abbr: item.measAbbr
        }
      },
      qoh: item.qoh
    }

    pantry.push(pantryItem);
  }

  res.status(200);
  res.send(pantry);
})

app.get('/getRecipeIngredients', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let recipeId = req.query.recipeId;
  let results = await pool.query(
    `
    SELECT ri.quantity, i.id AS ingredientId, i.name AS ingredientName,
    m.id AS measurementId, m.name AS measurementName
    FROM recipe_ingredients AS ri
    INNER JOIN ingredients AS i ON ri.ingredientId = i.id
    INNER JOIN measurements AS m ON ri.measurementId = m.id
    WHERE recipeId = ?
    `,
    [ recipeId ]
  );

  let ingredients = [];

  for (let result of results) {
    let ingredient = {
      ingredient: {
        id: result.ingredientId,
        name: result.ingredientName
      },
      measurement: {
        id: result.measurementId,
        name: result.measurementName
      },
      quantity: result.quantity
    }

    ingredients.push(ingredient);
  }

  res.status(200);
  res.send(JSON.stringify(ingredients));
})

app.post('/saveMeasurement', async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let newMeas = req.body.newMeasurement

  try {
    let insert = await pool.query("INSERT INTO measurements (name, abbr) VALUES (?, ?)", [newMeas.name, newMeas.abbr]);

    newMeas.id = insert.insertId;

    res.status(200);
    res.send(newMeas);
  }
  catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409);
    }
    else {
      res.status(500);
    }
    res.send(error);
  }
})

app.post("/saveConversion", async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let newConv = req.body.newConversion;

  try {
    let insert = await pool.query(
      `
      INSERT INTO conversions (ingredientId, isGeneric, measOneQty, measOneId, measTwoQty, measTwoId)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [newConv.ingredient.id, newConv.isGeneric, newConv.measOneQty, newConv.measOne.id, newConv.measTwoQty, newConv.measTwo.id]
    )

    newConv.id = insert.insertId;

    res.status(200);
    res.send(newConv);
  }
  catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409);
    }
    else {
      res.status(500);
    }
    res.send(error);
  }
})

app.post("/saveIngredient", async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let newIngredient = req.body.newIngredient;

  try {
    let insert = await pool.query(
      `
      INSERT INTO ingredients (name, defaultMeasId)
      VALUES (?, ?)
      `,
      [newIngredient.name, newIngredient.defaultMeasurement.id]
    );

    newIngredient.id = insert.insertId;

    res.status(200);
    res.send(newIngredient);
  }
  catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409);
    }
    else {
      res.status(500);
    }
    res.send(error);
  }
})

app.post("/saveRecipe", async function (req, res) {
  res.setHeader("ContentType", "application/json");

  let recipe = req.body.newRecipe;

  try {
    let recipeInsert = await pool.query(
      `
      INSERT INTO recipes (name, directions, canMake)
      VALUES (?, ?, ?)
      `,
      [recipe.name, recipe.directions, recipe.canMake]
    )

    recipe.id = recipeInsert.insertId;

    for (let recipeIngredient of recipe.ingredients) {
      await pool.query(
        `
        INSERT INTO recipe_ingredients (recipeId, ingredientId, measurementId, quantity)
        VALUES (?, ?, ?, ?)
        `,
        [recipe.id, recipeIngredient.ingredient.id, recipeIngredient.measurement.id, recipeIngredient.quantity]
      );
    }

    res.status(200);
    res.send(recipe);
  }
  catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409);
    }
    else {
      res.status(500);
    }
    res.send(error);
  }
})

app.listen(port, function() {
  console.log("Pantry API is listening on port " + port + ".");
})