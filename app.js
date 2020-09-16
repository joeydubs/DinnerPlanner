require('dotenv').config();

const port = 5200;
const express = require('express');
const pool = require('./database');

const app = express()

app.use(express.json())

app.get('/getAllMeasurements', async function (req, res) {
  console.log("Calling /getAllMeasurements...");
  res.setHeader("ContentType", "application/json");

  let measurements = await pool.query("SELECT * FROM measurements");

  res.status(200);
  res.send(JSON.stringify(measurements));
})

app.get('/getAllConversions', async function (req, res) {
  console.log("Calling /getAllConversions...");
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

app.listen(port, function() {
  console.log("Pantry API is listening on port " + port + "!");
})