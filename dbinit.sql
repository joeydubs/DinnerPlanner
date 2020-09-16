USE dinnerplanner;

DROP TABLE IF EXISTS recipie_ingredients;
DROP TABLE IF EXISTS recipies;
DROP TABLE IF EXISTS conversions;
DROP TABLE IF EXISTS pantry;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS measurements;

CREATE TABLE measurements (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  abbr VARCHAR(10),
  PRIMARY KEY (id)
);

CREATE TABLE ingredients (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  defaultMeasId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (defaultMeasId) REFERENCES measurements(id)
);

CREATE TABLE conversions (
  id INTEGER AUTO_INCREMENT,
  isGeneric BOOLEAN,
  ingredientId INTEGER,
  measOneId INTEGER,
  measOneQty DOUBLE NOT NULL,
  measTwoId INTEGER,
  measTwoQty DOUBLE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (ingredientId) REFERENCES ingredients(id),
  FOREIGN KEY (measOneId) REFERENCES measurements(id),
  FOREIGN KEY (measTwoId) REFERENCES measurements(id)
);

CREATE TABLE pantry (
  ingredientId INTEGER NOT NULL,
  qoh DOUBLE NOT NULL DEFAULT 0,
  FOREIGN KEY (ingredientId) REFERENCES ingredients(id)
);

CREATE TABLE recipies (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(100),
  directions VARCHAR(2000),
  canMake BOOL,
  PRIMARY KEY(id)
);

CREATE TABLE recipie_ingredients (
  recipieId INTEGER,
  ingredientId INTEGER,
  measurementId INTEGER NOT NULL,
  quantity DOUBLE, 
  PRIMARY KEY(recipieId, ingredientId),
  FOREIGN KEY (recipieId) REFERENCES recipies(id),
  FOREIGN KEY (ingredientId) REFERENCES ingredients(id),
  FOREIGN KEY (measurementId) REFERENCES measurements(id)
);

