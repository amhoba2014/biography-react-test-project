import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './state/store';

import Root from "./routes/root";
import ErrorPage from "./routes/misc/error-page";
import Index from "./routes/index";
import Builder, {
  routeLoader as builderLoader,
  routeAction as builderAction
} from './routes/builder';
import Content, {
  routeLoader as contentLoader,
  routeAction as contentAction
} from './routes/content';
import Biography from './routes/biography';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "builder/",
        element: <Builder />,
        loader: builderLoader,
        action: builderAction,
      },
      {
        path: "content/",
        element: <Content />,
        loader: contentLoader,
        action: contentAction,
      },
      {
        path: "biography/",
        element: <Biography />,
      }
    ],
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
