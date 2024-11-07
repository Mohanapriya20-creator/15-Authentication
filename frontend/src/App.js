import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage,{action as authAction} from './pages/Authentication';
import {action as logoutAction} from './pages/Logout';
import { tokenLoader,checkAuthToken } from './util/auth';


//the route object has the following properties:
//path: the path of the route
//element: the component to render for the route
//errorElement: the component to render if an error occurs while loading the route
//id: the id of the route
//loader: a function used to load data before the route is rendered
//children: an array of child route objects
//index: a boolean value that specifies whether the route is the default route
//action: a function that is called when the route is rendered

//createBrowserRouter is a function that creates a router object
//that is used to define the routes of the application
//it takes an array of route objects as an argument
//each route object defines a route in the application
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      //index defines the default route
      { index: true, element: <HomePage /> },
      {
        //relative path
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            //loader is a function used to load data before a component or route is rendered.
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            //loader is a function that returns a promise
            //that resolves to the data needed for the route
            //in this case, the event with the given id is loaded
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthToken
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthToken
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
