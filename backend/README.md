Build and Start from backend: npm run build-frontend

GET ALL RECIPES
GET: /api/recipes

FILTER AFTER CATEGORY
GET: /api/recipes/?category=name
=>name is to be replaced by category name

//ADD A RECIPE
POST: /api/recipes/add
=>JSON format:
{
"name": "Spaghetti carbonara",
"image_url": "https://exempel.se/carbonara.jpg",
"servings": 4,
"time_minutes": 20,
"category_id": 2,
"steps": [
{ "step_number": 1, "instruction": "Koka spaghetti enligt förpackningen i saltat vatten." },
{ "step_number": 2, "instruction": "Stek pancettan i en torr panna tills krispig." },
{ "step_number": 3, "instruction": "Vispa ihop äggulor, riven pecorino och svartpeppar i en skål." },
{ "step_number": 4, "instruction": "Blanda den varma pastan med pancettan och ta av från värmen." },
{ "step_number": 5, "instruction": "Rör ner äggblandningen snabbt så att den inte stelnar. Späd med pastavatten." }
],
"ingredients": [
{ "name": "spaghetti", "amount": 400, "unit": "gram" },
{ "name": "pancetta", "amount": 150, "unit": "gram" },
{ "name": "äggulor", "amount": 4, "unit": "st" },
{ "name": "pecorino", "amount": 1, "unit": "dl" },
{ "name": "svartpeppar","amount": 1, "unit": "tsk" },
{ "name": "salt", "amount": 1, "unit": "tsk" }
]
}

//UPDATE RECIPE
PUT: /api/recipes/update/:id
=>Replace :id with recipe id
=>JSON for the field/s to be updated. Format:
{"name": "Spaghetti carbonara",
"time_minutes": 20}

//DELETE RECIPE
PUT: /api/recipes/delete/:id
=>Replace :id with recipe id
