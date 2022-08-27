import { LTWActivity } from '../components';
import { LoginPage } from '../pages';

export const isAuthLTWPath = [
  {
    path: '/activity',
    element: <LTWActivity />,
  },
];

export const unAuthLTWPath = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];
