# nodejs-task4

## Общее описание
This API provides functionality for managing attempts for chess exercises. It allows you to create attempts, get a list of them, and count the number of attempts for certain exercises.

# Setup

Execute `docker-compose up` in the terminal for starting db in Docker

Execute `npm install` in the terminal for installing application dependencies


# How to develop

```
npm run devel
```

## Note on Developing mode
In this mode, in parallel with the main server of this application, a mock server is launched, which simulates the responses of the external Chess Tasks service

# How to run tests

```
npm run test
```

## Note on Testing

During the tests, access to the external service is mocked. The mock server is set up to respond with appropriate data or errors based on the requests made during the tests.


## API Documentation

### Routes (Endpoints)

#### Create an attempt

- **URL**: `/api/attempt`.
**Method**: `POST`.
**Description**: Creates a new attempt.
**Request Body**:
  ```json
  {
    "studentId": number,
    "timeSpent": string,
    "solved": boolean,
    "exerciseId": number
  }
  ```
  **Answers**:
  ```json
  {
    "message": "Attempt added successfully",
    "attempt": {
      "studentId": number,
      "timeSpent": string,
      "solved": boolean,
      "exerciseId": number,
      "datetime": string,
      "_id": string,
      "__v": number
    }
  }
  ```
  ```json
  {
    "message": "Error adding attempt",
    "errorMessage": "Attempt cannot be added as exercise with the id 12 does not exist"
  } 
  ```