import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./components/login/Login.tsx";
import { Provider } from "react-redux";
import { store } from "./reducers/store.ts";
import { LOGIN_ROUTE } from "./strings/api-consts.ts";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

// Check if root is already created to avoid duplicate createRoot calls
const rootElement = document.getElementById("root") as HTMLElement;
const existingRoot = (rootElement as any)._reactRootContainer;

if (!existingRoot) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <Theme scaling="100%" accentColor="orange">
        <RouterProvider router={router} />
        <Toaster
          toastOptions={{
            style: {
              maxWidth: 500,
            },
          }}
        />
      </Theme>
    </Provider>
  );
} else {
  existingRoot.render(
    <Provider store={store}>
      <Theme scaling="100%" accentColor="orange">
        <RouterProvider router={router} />
        <Toaster
          toastOptions={{
            style: {
              maxWidth: 500,
            },
          }}
        />
      </Theme>
    </Provider>
  );
}

function PrivateRoute() {
  
  const user = localStorage.getItem("user") as string
  const isAuthenticated = user && user !== "";
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />;
}
