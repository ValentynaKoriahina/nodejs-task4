import Attempt from 'src/model/attempt';
import { fetchDataFromSpringBootAPI } from 'src/services/exercise';
import { sendEmail } from 'src/services/email';

/**
 * Adds a new attempt to the database.
 * 
 * @param {Object} data - The attempt data.
 * @param {string} data.studentId - The ID of the student.
 * @param {number} data.timeSpent - The time spent on the exercise in seconds.
 * @param {boolean} data.solved - Indicates if the exercise was solved.
 * @param {number} data.exerciseId - The ID of the exercise.
 * @returns {Promise<Attempt>} - The newly created attempt.
 * @throws {Error} - If the exercise ID is not valid.
 */
export const addAttempt = async (data: { studentId: string, timeSpent: number, solved: boolean, exerciseId: number }) => {
  const { studentId, timeSpent, solved, exerciseId } = data;

  // Validate exerciseId (external service request)
  const validExerciseId = await fetchDataFromSpringBootAPI(exerciseId);

  if (!validExerciseId) {
    throw new Error(`Attempt cannot be added as exercise with the id ${exerciseId} does not exist`);
  }

  const newAttempt = new Attempt({
    studentId,
    timeSpent,
    solved,
    exerciseId,
    datetime: new Date(),
  });

  await newAttempt.save();

  const recipient = 'valpetrenko88@gmail.com';
  const subject = 'A new attempt has been made';
  const content = 'An attempt was made by the user to solve the exercise';

  // Send message to Mail Service through RabbitMQ
  sendEmail(recipient, subject, content);

  return newAttempt;
};

/**
 * Retrieves attempts from the database based on the exercise ID.
 * 
 * @param {string} exerciseId - The ID of the exercise.
 * @param {string} [size] - The number of attempts to retrieve.
 * @param {string} [from] - The offset from which to start retrieving attempts.
 * @returns {Promise<Attempt[]>} - The list of attempts.
 */
export const getAttempts = async (exerciseId: string, size?: string, from?: string) => {
  const limit = size ? parseInt(size) : 10;
  const skip = from ? parseInt(from) : 0;

  const attempts = await Attempt.find({ exerciseId })
    .sort({ datetime: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  return attempts;
};

/**
 * Retrieves the count of attempts for each exercise ID.
 * 
 * @param {number[]} exerciseIds - The list of exercise IDs.
 * @returns {Promise<{ [key: number]: number }>} - An object mapping exercise IDs to their attempt counts.
 */
export const getAttemptsCounts = async (exerciseIds: number[]) => {
  const counts: { [key: number]: number } = {};
  exerciseIds.forEach((id: number) => {
    counts[id] = 0;
  });

  const results = await Attempt.aggregate([
    { $match: { exerciseId: { $in: exerciseIds } } },
    { $group: { _id: "$exerciseId", count: { $sum: 1 } } },
  ]);

  results.forEach((result: { _id: number, count: number }) => {
    counts[result._id] = result.count;
  });

  return counts;
};
