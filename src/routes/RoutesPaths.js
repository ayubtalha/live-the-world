import { LTWActivity } from '../components';
import { LoginPage } from '../pages';

export const LTWRoutePaths = [
  {
    path: '/activities/:activity_slug',
    element: <LTWActivity />,
  },
  {
    path: '/login',
    element: <LoginPage loggedInUser={true} />,
  },
];
