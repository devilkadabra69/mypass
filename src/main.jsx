import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import store from "./store/Store.js";
import { Provider } from "react-redux";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Profile from "./pages/Profile.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="" element={<Home />} />
//       <Route path="about" element={<About />} />
//       <Route path="contact" element={<Contact />} />
//       <Route path="login" element={<Login />} />
//       <Route path="signup" element={<Signup />} />
//       <Route path="all-posts" element={<AllPosts />} />
//       <Route path="profile" element={<Profile />} />
//     </Route>
//   )
// );

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path="all-posts"
        element={
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        }
      />
      <Route
        path="profile"
        element={
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        }
      />
    </Route>
  )
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "contact",
//         element: <Contact />,
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthLayout authentication={false}>
//             <Login />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/signup",
//         element: (
//           <AuthLayout authentication={false}>
//             <Signup />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/all-posts",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <AllPosts />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/profile",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <Profile />
//           </AuthLayout>
//         ),
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>
  </Provider>
);
