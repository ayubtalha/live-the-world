import { LTWActivity } from '../components';
import { LoginPage } from '../pages';

export const LTWRoutePaths = [
  {
    path: '/activity',
    element: <LTWActivity />,
  },
  {
    path: '/login',
    element: <LoginPage loggedInUser={true} />,
  },
];
