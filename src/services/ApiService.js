import axios from 'axios';

import {
  LOG_IN,
  GET_ACTIVITIES,
  GET_TRIPS,
  GET_NEARBY_ACTIVITY,
  ADD_EXISTING_FAV_TRIPS,
  REMOVE_EXISTING_FAV_TRIPS,
} from '../constants/ApiEndpoints';
import { getAuthHeader } from '../utils';

class ApiService {
  async login(data) {
    let response = null;
    try {
      response = await axios.post(
        LOG_IN,
        { ...data },
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
  async getActivities(activitySlug) {
    let response = null;
    try {
      response = await axios.get(GET_ACTIVITIES(activitySlug), {
        headers: { 'Content-Type': 'application/json' },
      });
      return response;
    } catch (err) {
      console.log('Error:', err);
      return err.response;
    }
  }
  async getTrips() {
    let response = null;
    try {
      response = await axios.get(GET_TRIPS, getAuthHeader());
      return response;
    } catch (err) {
      console.log('Error:', err);
      return err.response;
    }
  }
  async getNearbyActivity(activity_id) {
    let response = null;
    try {
      response = await axios.get(
        GET_NEARBY_ACTIVITY(activity_id),
        getAuthHeader()
      );
      return response;
    } catch (err) {
      console.log('Error:', err);
      return err.response;
    }
  }
  async addActivityToExistingFavTrips(payloadData) {
    let response = null;
    try {
      response = await axios.put(
        ADD_EXISTING_FAV_TRIPS,
        payloadData,
        getAuthHeader()
      );
      return response;
    } catch (err) {
      console.log('Error:', err);
      return err.response;
    }
  }
  async removeActivityToExistingFavTrips(payloadData) {
    let response = null;
    try {
      response = await axios.put(
        REMOVE_EXISTING_FAV_TRIPS,
        payloadData,
        getAuthHeader()
      );
      return response;
    } catch (err) {
      console.log('Error:', err);
      return err.response;
    }
  }
}

export default new ApiService();
