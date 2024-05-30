import axios from 'axios';
import config from 'src/config';

/**
 * Service to fetch data from Spring Boot API to check if an exercise with the given ID exists.
 * 
 * @param {number} exerciseId - The ID of the exercise to check.
 * @returns {Promise<boolean>} - Returns true if the exercise exists, otherwise false.
 * @throws {Error} - If there is an error making the request to the API.
 */
export const fetchDataFromSpringBootAPI = async (exerciseId: number) => {
  try {
    await axios.get(`${config.chessApiAddress}/chess_exercise/${exerciseId}`);
    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false;
    } else {
      console.error('Error fetching data from Spring Boot API:', error);
      throw error;
    }
  }
};
