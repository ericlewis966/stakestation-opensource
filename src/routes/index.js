import { useRoutes } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';

import LandingPage from '../pages/LandingPage';
import AdminPage from '../pages/AdminPage';
import ProjectPage from '../pages/ProjectPage';

export default function Router() {
  return useRoutes([
    // Main Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/admin', element: <AdminPage /> },
        { path: '/project', element: <ProjectPage /> }
      ]
    }
  ]);
}
