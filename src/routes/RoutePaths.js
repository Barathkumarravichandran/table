import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Calender from '../component/calender/Calender';
import Dashboard from '../component/dashboard/Dashboard';
import Products from '../component/products/Products';
import Project from '../component/project/Project';
import Tasks from '../component/tasks/Tasks';

const RoutePaths = () => {
  const routeData = [
    {
      path: "/",
      element: <Products />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "Project",
      element: <Project />
    },
    {
      path: "Tasks",
      element: <Tasks />
    },
    {
      path: "Calender",
      element: <Calender />
    }
  ]
  return (
    <Routes>
      {routeData.map((routepath, index) =>
        <Route
          path={routepath.path}
          element={routepath.element}
          key={index}
        />
      )
      }
    </Routes>
  )
}

export default RoutePaths