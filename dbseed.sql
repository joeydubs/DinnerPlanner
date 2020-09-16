USE dinnerplanner;


-- MEASUREMENTS SEED DATA --

INSERT INTO measurements
  (name, abbr)
VALUES
  ("Teaspoon", "tsp");

INSERT INTO measurements
  (name, abbr)
VALUES
  ("Tablespoon", "tbsp");

INSERT INTO measurements
  (name)
VALUES
  ("Cup");

INSERT INTO measurements
  (name, abbr)
VALUES
  ("Pound", "lb");

INSERT INTO measurements
  (name, abbr)
VALUES
  ("Ounce", "oz");

INSERT INTO measurements
  (name)
VALUES
  ("Egg");




-- INGREDIENTS SEED DATA --
INSERT INTO ingredients
  (name, defaultMeasId)
VALUES
  ("Flour", 4);

INSERT INTO ingredients
  (name, defaultMeasId)
VALUES
  ("Egg", 6);




-- CONVERSIONS SEED DATA --

INSERT INTO conversions
  (isGeneric, ingredientId, measOneId, measOneQty, measTwoId, measTwoQty)
VALUES
  (true, null, 1, 3, 2, 1);

INSERT INTO conversions
  (isGeneric, ingredientId, measOneId, measOneQty, measTwoId, measTwoQty)
VALUES
  (true, null, 2, 16, 3, 1);




-- PANTRY SEED DATA --

INSERT INTO pantry
  (ingredientId, qoh)
VALUES
  (1, 5);

INSERT INTO pantry
  (ingredientId, qoh)
VALUES
  (2, 6);




-- RECIPIES SEED DATA --

INSERT INTO recipies
  (name, directions, canMake)
VALUES
  ("Chili", "Mix it up in a pot.", true);

INSERT INTO recipies
  (name, directions, canMake)
VALUES
  ("Scrambled Eggs", "Whisk and fry.", true);




-- RECIPIE_INGREDIENTS SEED DATA --

INSERT INTO recipie_ingredients
  (recipieId, ingredientId, measurementId, quantity)
VALUES
  (1, 1, 2, 3);

INSERT INTO recipie_ingredients
  (recipieId, ingredientId, measurementId, quantity)
VALUES
  (1, 2, 6, 1);

INSERT INTO recipie_ingredients
  (recipieId, ingredientId, measurementId, quantity)
VALUES
  (2, 2, 6, 2);

