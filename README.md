# DemarcoCristiano

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Fake DB data

{
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
}