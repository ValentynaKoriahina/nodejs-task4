import { Request, Response } from 'express';
import {
  addAttempt as addAttemptApi,
  getAttempts as getAttemptsApi,
  getAttemptsCounts as getAttemptsCountApi,
} from 'src/services/attempt';

/**
 * Adds a new Attempt.
 */
export const addAttempt = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newAttempt = await addAttemptApi(req.body);
    return res.status(201).json({ message: 'Attempt added successfully', attempt: newAttempt });
  } catch (error: any) {
    const errorMessage = error.message;
    return res.status(400).json({ message: 'Error adding attempt', errorMessage });
  }
};

/**
 * Gets the Attempts for the given exercise.
 */
export const getAttempts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { exerciseId, size, from } = req.query;

    if (!exerciseId) {
      return res.status(400).json({ message: 'exerciseId is required' });
    }

    const attempts = await getAttemptsApi(exerciseId as string, size as string, from as string);
    return res.status(200).json(attempts);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving attempts', error });
  }
};

/**
 * Gets the number of attempts for the given exercises.
 */
export const getAttemptsCounts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { exerciseIds } = req.body;

    if (!exerciseIds || !Array.isArray(exerciseIds)) {
      return res.status(400).json({ message: 'exerciseIds is required and should be an array' });
    }

    const counts = await getAttemptsCountApi(exerciseIds);
    return res.status(200).json(counts);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving counts', error });
  }
};
