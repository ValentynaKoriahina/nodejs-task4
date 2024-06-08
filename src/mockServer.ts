import express, { Request, Response } from 'express';

const mockExerciseApp = express();

/**
 * Route for handling GET requests to the Chess Exercise service '...:8080/api/chess_exercise/:exerciseId'.
 * This route is used to simulate the server's response to Chess Exercise requests.
 * The ':exerciseId' parameter in the URL represents the identifier of the exercise to be checked.
 */
mockExerciseApp.get('/api/chess_exercise/:exerciseId', (req: Request, res: Response) => {
  const exerciseId = parseInt(req.params.exerciseId, 10);

  const validExerciseIds = [1, 2, 3];

  if (validExerciseIds.includes(exerciseId)) { // Check if exerciseId is in the list of valid IDs
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Exercise not found' });
  }
});

const port = process.env.PORT || 8080;
mockExerciseApp.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});
