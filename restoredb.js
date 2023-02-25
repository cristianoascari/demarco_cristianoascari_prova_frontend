'use strict';

const fs = require('fs');

const dbData = JSON.stringify({
  "customers": [
    { "id": 1, "name": "John Doe", "age": 31, "city": "Miami" },
    { "id": 2, "name": "Carlos Santos", "age": 38, "city": "Belo Horizonte" }, { "id": 3, "name": "Mário Silva", "age": 27, "city": "São Paulo" },
    { "id": 4, "name": "Gilberto Alencar", "age": 32, "city": "Recife" },
    { "id": 5, "name": "João Alves", "age": 19, "city": "Campo Grande" }
  ], 
  "orders": [
    { "id": 1, "total": 799, "customerId": 2, "items": [ { "item": "Meias", "value": 499 }, { "item": "Cueca", "value": 300 } ] },
    { "id": 2, "total": 8814, "customerId": 1, "items": [ { "item": "Camiseta", "value": 2999 }, { "item": "Bermuda", "value": 5000 }, { "item": "Boné", "value": 815 } ] },
    { "id": 3, "total": 5119, "customerId": 5, "items": [ { "item": "Sunga", "value": 4999 }, { "item": "Sacola de Praia", "value": 120 } ] },
    { "id": 4, "total": 8790, "customerId": 3, "items": [ { "item": "Chinelo Havaiana", "value": 8790 } ] },
    { "id": 5, "total": 12500, "customerId": 5, "items": [ { "item": "Óculos de Sol", "value": 12500 } ] }
  ]
});

fs.writeFileSync('./db.json', dbData);