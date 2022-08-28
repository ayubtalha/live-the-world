export const getAuthHeader = () => {
  const jwtToken = localStorage.getItem('jwt');
  if (jwtToken) {
    return { headers: { Authorization: `Bearer ${jwtToken}` } };
  }
  return null;
};
export default getAuthHeader;
