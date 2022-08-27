import axios from 'axios';

import { LOG_IN, GET_ACTIVITIES } from '../constants/ApiEndpoints';

class ApiService {
  async login(data) {
    let response = null;
    try {
      response = await axios.post(
        LOG_IN,
        // { ...data }, [LTW-TODO]: Remove the dependecy from .env once project completed
        {
          identifier: process.env.REACT_APP_IDENTIFIER,
          password: process.env.REACT_APP_PASSWORD,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response;
    } catch (err) {
      console.log('Error:', err);
      return err.response;
    }
  }
  async getActivities() {
    let response = null;
    try {
      response = await axios.get(GET_ACTIVITIES, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response;
    } catch (err) {
      console.log('Error:', err);
      return err.response;
    }
  }
}

export default new ApiService();
