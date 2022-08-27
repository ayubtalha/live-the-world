import axios from 'axios';

import { LOG_IN } from '../constants/ApiEndpoints';

class ApiService {
  async login(data) {
    console.log('ident', process.env.REACT_APP_IDENTIFIER);
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
}

export default new ApiService();
