export const LTW_API_URL = 'https://ltw-cms-stg.herokuapp.com';

export const LOG_IN = `${LTW_API_URL}/auth/local/`;

// export const GET_ACTIVITIES = `${LTW_API_URL}/frontend/activities/slug/:activity_slug`; [LTW-TODO] - Make it dynamic
export const GET_ACTIVITIES = `${LTW_API_URL}/frontend/activities/slug/birth-forest-geboortebos`;
// export const GET_ACTIVITIES = `${LTW_API_URL}/frontend/activities/slug/belfry-of-ghent`;
// export const GET_ACTIVITIES = (activity_slug) =>
//   `${LTW_API_URL}/frontend/activities/slug/${activity_slug}`;

export const GET_TRIPS = `${LTW_API_URL}/frontend/trips`;
export const GET_NEARBY_ACTIVITY = (activity_id) =>
  `${LTW_API_URL}/frontend/activities/nearby/${activity_id}`;
