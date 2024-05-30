/* eslint-disable */
/* eslint-env mongo */db = db.getSiblingDB('db1');

db.createCollection('attempt', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentId", "timeSpent", "solved", "exerciseId", "datetime"],
      properties: {
        studentId: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        timeSpent: {
          bsonType: "string",
          description: "must be a string and is required",
          pattern: "^PT\\d+H\\d+M\\d+S$"
        },
        solved: {
          bsonType: "bool",
          description: "must be a boolean and is required"
        },
        exerciseId: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        datetime: {
          bsonType: "date",
          description: "must be a date and is required"
        },
      },
    },
  },
});
