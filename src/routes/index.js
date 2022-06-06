import React, { useRoutes } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';

import LandingPage from '../pages/LandingPage';
import AdminPage from '../pages/AdminPage';
import ProjectPage from '../pages/ProjectPage';
import AddNewProject from 'src/pages/AddNewProject';
import EditProjectPage from 'src/pages/EditProject';
import StakeStationPage from 'src/pages/StakeStationPage';
import EditStakePage from 'src/pages/EditStakePage';

export default function Router() {

  return useRoutes([
    // Main Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/admin', element: <AdminPage to={1} /> },
        { path: '/admin/newproject', element: <AddNewProject /> },
        { path: '/admin/editproject/:id', element: <EditProjectPage /> },
        { path: '/admin/project/:id', element: <StakeStationPage /> },
        { path: '/admin/project/newstake/:id/:STAKE_TYPE', element: <AdminPage to={2} /> },
        { path: '/admin/project/edit/:id/:STAKE_TYPE', element: <EditStakePage /> },
        { path: '/project/:id', element: <ProjectPage /> }
      ]
    }
  ]);
}
