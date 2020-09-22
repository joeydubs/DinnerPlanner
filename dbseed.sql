USE dinnerplanner;


-- MEASUREMENTS SEED DATA --

INSERT INTO measurements
  (id, name)
VALUES
  (1, "generic");

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
  (id, name, defaultMeasId)
VALUES
  (1, "Generic", 1);

INSERT INTO ingredients
  (name, defaultMeasId)
VALUES
  ("Flour", 5);

INSERT INTO ingredients
  (name, defaultMeasId)
VALUES
  ("Egg", 7);




-- CONVERSIONS SEED DATA --

INSERT INTO conversions
  (isGeneric, ingredientId, measOneId, measOneQty, measTwoId, measTwoQty)
VALUES
  (true, 1, 2, 3, 3, 1);

INSERT INTO conversions
  (isGeneric, ingredientId, measOneId, measOneQty, measTwoId, measTwoQty)
VALUES
  (true, 1, 3, 16, 4, 1);




-- PANTRY SEED DATA --

INSERT INTO pantry
  (ingredientId, qoh)
VALUES
  (2, 5);

INSERT INTO pantry
  (ingredientId, qoh)
VALUES
  (3, 6);




-- recipeS SEED DATA --

INSERT INTO recipes
  (name, directions, canMake)
VALUES
  ("Chili", "Mix it up in a pot.", true);

INSERT INTO recipes
  (name, directions, canMake)
VALUES
  ("Scrambled Eggs", "Whisk and fry.", true);




-- recipe_INGREDIENTS SEED DATA --

INSERT INTO recipe_ingredients
  (recipeId, ingredientId, measurementId, quantity)
VALUES
  (1, 2, 3, 3);

INSERT INTO recipe_ingredients
  (recipeId, ingredientId, measurementId, quantity)
VALUES
  (1, 3, 7, 1);

INSERT INTO recipe_ingredients
  (recipeId, ingredientId, measurementId, quantity)
VALUES
  (2, 3, 7, 2);

