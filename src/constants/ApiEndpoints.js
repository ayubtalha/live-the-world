// DEFAULT URL
export const LTW_API_URL = 'https://ltw-cms-stg.herokuapp.com';

// LOGIN
export const LOG_IN = `${LTW_API_URL}/auth/local/`;

// ACTIVITIES
export const GET_ACTIVITIES = (activity_slug) =>
  `${LTW_API_URL}/frontend/activities/slug/${activity_slug}`;

// TRIPS
export const GET_TRIPS = `${LTW_API_URL}/frontend/trips`;

// NEARBY ACTIVITIES
export const GET_NEARBY_ACTIVITY = (activity_id) =>
  `${LTW_API_URL}/frontend/activities/nearby/${activity_id}`;

// ADD ACTIVITY
export const ADD_EXISTING_FAV_TRIPS = `${LTW_API_URL}/frontend/trips/add_activity`;

// REMOVE ACTIVITY
export const REMOVE_EXISTING_FAV_TRIPS = `${LTW_API_URL}/frontend/trips/remove_activity`;
