import express, { Request, Response } from 'express';

const mockExerciseApp = express();

mockExerciseApp.get('/api/chess_exercise/:exerciseId', (req: Request, res: Response) => {
  const exerciseId = parseInt(req.params.exerciseId, 10); // Convert exerciseId to number

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
