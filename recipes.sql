DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS steps;
DROP TABLE IF EXISTS recipes_ingredients;

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE ingredients(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE units(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    image_url VARCHAR NOT NULL,
    servings INTEGER NOT NULL,
    time_minutes INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE steps(
    id SERIAL PRIMARY KEY,
    step_number INTEGER NOT NULL,
    instruction VARCHAR NOT NULL,
    recipe_id INTEGER NOT NULL,
    FOREIGN KEY(recipe_id) REFERENCES recipes(id)
);

CREATE TABLE recipes_ingredients(
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL,
    amount DOUBLE PRECISION,
    unit_id INTEGER,
    ingredient_id INTEGER NOT NULL,
    FOREIGN KEY(recipe_id) REFERENCES recipes(id),
    FOREIGN KEY(unit_id) REFERENCES units(id),
    FOREIGN KEY(ingredient_id) REFERENCES ingredients(id)
);


INSERT INTO categories(name) VALUES ('Fisk');
INSERT INTO categories(name) VALUES ('Kött');
INSERT INTO categories(name) VALUES ('Veg');

INSERT INTO ingredients(name) VALUES ('delikatesspotatis');
INSERT INTO ingredients(name) VALUES ('smör');
INSERT INTO ingredients(name) VALUES ('färsk timjan');
INSERT INTO ingredients(name) VALUES ('färsk kruspersilja');
INSERT INTO ingredients(name) VALUES ('pressad citron');
INSERT INTO ingredients(name) VALUES ('parmigiano reggiano');

INSERT INTO units(name) VALUES ('gram');
INSERT INTO units(name) VALUES ('knippe');
INSERT INTO units(name) VALUES ('st');
INSERT INTO units(name) VALUES ('dl');

INSERT INTO recipes (name, servings, time_minutes, category_id) VALUES ('Smashed potatoes med örtsmör & parmesan', 4, 25, 3);

INSERT INTO steps (step_number, instruction, recipe_id) VALUES (1, 'Förkoka potatisen i ca 10 min och sätt ugnen på 200 grader.', 1);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (2, 'Mixa rumstempat smör med örterna och citron.', 1);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (3, 'Smasha potatisen på en ugnsform med ett glas. Smeta på örtsmöret rosta i ugnen i ca 10 minuter.', 1);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (4, 'Riv över parmesan och servera!', 1);

INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (1, 900, 1, 1);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (1, 75, 1, 2);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (1, 1, 2, 3);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (1, 1, 2, 4);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (1, 1, 3, 5);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (1, 1, 4, 6);

INSERT INTO ingredients(name) VALUES ('turkisk yoghurt');
INSERT INTO ingredients(name) VALUES ('sambal oelek');
INSERT INTO ingredients(name) VALUES ('citron, zest och juice');
INSERT INTO ingredients(name) VALUES ('vitlöksklyfta, riven');
INSERT INTO ingredients(name) VALUES ('salt');
INSERT INTO ingredients(name) VALUES ('svartpeppar');
INSERT INTO ingredients(name) VALUES ('laxfiléer');
INSERT INTO ingredients(name) VALUES ('blomkålsris');
INSERT INTO ingredients(name) VALUES ('russin');
INSERT INTO ingredients(name) VALUES ('morötter, rivna');
INSERT INTO ingredients(name) VALUES ('hummus');

INSERT INTO units(name) VALUES ('msk');
INSERT INTO units(name) VALUES ('nypa');
INSERT INTO units(name) VALUES ('valfri mängd');

INSERT INTO recipes (name, image_url, servings, time_minutes, category_id) VALUES ('Sallad med yoghurtmarinerad lax', 'https://www.garantskafferiet.se/globalassets/garant/04-nya-receptsidan-2024/sallad/1920x1080-Garant-receptbild-laxsallad.jpg?preset=16-9-s', 4, 15, 1);

INSERT INTO steps (step_number, instruction, recipe_id) VALUES (1, 'Sätt ugnen på 200 °C.', 2);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (2, 'Blanda ihop yoghurt, sambal oelek, citronzest, citronjuice, riven vitlök, salt och peppar i en skål. För över ca ¼ av yoghurtmarinaden till en annan skål och spara till servering.', 2);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (3, 'Skär upp laxbitarna i kuber (ca 8 kuber per filé). Rör försiktigt ned i yoghurtmarinaden så att alla bitar täcks. Sprid ut laxbitarna på en bakplåtspappersklädd plåt och baka i ca 8 minuter, eller tills laxen når en innertemperatur på ca 56°C.', 2);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (4, 'Servera laxen med blomkålsris, riven morot, russin och hummus.', 2);

INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 2.5, 4, 7);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 1, 5, 8);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 1, 3, 9);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 1, 3, 10);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 1, 6, 11);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 1, 6, 12);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 4, 3, 13);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 500, 1, 14);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 2, 4, 15);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (2, 2, 3, 16);
INSERT INTO recipes_ingredients(recipe_id, unit_id,  ingredient_id) VALUES (2, 7, 17);

INSERT INTO ingredients(name) VALUES ('ägg');
INSERT INTO ingredients(name) VALUES ('shredded chicken');
INSERT INTO ingredients(name) VALUES ('fetaost, smulad');
INSERT INTO ingredients(name) VALUES ('babyspenat');
INSERT INTO ingredients(name) VALUES ('machésallad');
INSERT INTO ingredients(name) VALUES ('olivolja');
INSERT INTO ingredients(name) VALUES ('rödvinsvinäger');

INSERT INTO recipes (name, image_url, servings, time_minutes, category_id) VALUES ('Omelett med shredded chicken, spenat & fetaost', 'https://www.garantskafferiet.se/globalassets/garant/04-nya-receptsidan-2024/frukostbrunch/1920x1080-Garant-receptbild-omelett.jpg?preset=16-9-s', 1, 30, 2);

INSERT INTO steps (step_number, instruction, recipe_id) VALUES (1, 'Knäck äggen i en bunke och krydda med salt och peppar. Rör om med en gaffel så att äggulorna blandas ut.', 3);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (2, 'Smält smör i en stekpanna. Sänk värmen och häll i äggen. Rör om försiktigt med en trägaffel och flytta runt äggen ungefär som när du gör scrambled eggs. Efter ca en minut ser du till att ägg täcker hela pannan. Tillsätt då spenat, kyckling och fetaost till ena halvan av omeletten.', 3);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (3, 'Känn efter med en stekspade om omeletten är klar. När den är redo kan du vika den tomma hälften över fyllningen.', 3);
INSERT INTO steps (step_number, instruction, recipe_id) VALUES (4, 'Låt fyllningen värmas upp i omeletten i ca 2-3 minuter. Servera sedan omeletten med förslagsvis machésallad dressad med olivolja, rödvinsvinäger och flingsalt.', 3);

INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (3, 2, 3, 18);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (3, 1, 6, 11);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (3, 2, 5, 2);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (3, 1, 4, 19);
INSERT INTO recipes_ingredients(recipe_id, amount, unit_id,  ingredient_id) VALUES (3, 50, 1, 20);
INSERT INTO recipes_ingredients(recipe_id,  ingredient_id) VALUES (3, 21);
INSERT INTO recipes_ingredients(recipe_id,  ingredient_id) VALUES (3, 22);
INSERT INTO recipes_ingredients(recipe_id,  ingredient_id) VALUES (3, 12);
INSERT INTO recipes_ingredients(recipe_id,  ingredient_id) VALUES (3, 23);
INSERT INTO recipes_ingredients(recipe_id,  ingredient_id) VALUES (3, 24);