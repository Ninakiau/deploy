import { createBrowserRouter } from "react-router-dom";

//pages
import {
  Login,
  Register,
  Home,
  LandingPage,
  RutaProtegida,
  DashboardPattern,
  SideBarEjemplo,
  Equipo,
  CourseCardContainer,
  SidebarCourse,
  Course,
} from "../index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "equipo",
        element: <Equipo />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <RutaProtegida />,
    children: [
      {
        path: "student",
        element: <DashboardPattern SideBarComponent={SideBarEjemplo} />,
        children: [
          {
            path: "mis-cursos",
            element: <CourseCardContainer />,
          },
          {
            path: "inscripcion-cursos",
            element: <CourseCardContainer />,
          }
        ],
      },
      {
        path: "curso/:id-curso",
        element: <DashboardPattern SideBarComponent={SidebarCourse} />,
        children: [
          {
            path: ":moduloid",
            element: <Course />,
          },
        ],
      },
      {
        path:"validate-profesor",
        element:<h1>Registro de validaciones para profesor</h1>
      },
      {
        path:"profesor",
        element: <DashboardPattern SideBarComponent={<h1>SideBar profesor</h1>} />,
        children:[
          {
            path: "mis-cursos",
            element:<h1>Cursos creado por el profesor</h1>
          }
        ]
      }
    ],
  },
]);

export default router;
