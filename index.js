const Ajv = require("ajv");
const schemaA = require("./schemaa.json");
const schemaB = require("./schemab.json");

const schemaC = {
    $id: "schemac.json",
    $schema: "http://json-schema.org/draft-07/schema",
    $merge: {
        "source": { "$ref": "schemaa.json#/definitions/person" },
        "with": {
                "$ref": "schemab.json#/definitions/person"
         }
    }
};


const ajv = new Ajv({schemas: [schemaA, schemaB ]});
require('ajv-merge-patch')(ajv);

ajv.addSchema(schemaC);


const validate = ajv.getSchema("schemac.json");

console.log(validate({
    "firstName": "Charlie",
    "lastName": "Farley",
    "age": 46,
    "shoesize": 15
})); //false

console.log(validate({
    "firstName": "Charlie",
    "lastName": "Farley",
    "age": 46,
    "shoesize": 14
})); //true
