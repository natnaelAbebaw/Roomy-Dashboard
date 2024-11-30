import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "./style/globalStyles";
import { ReactQueryDevtools } from "react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppDashBoardLayout from "./ui/AppDashBoardLayout";
import { Toaster } from "react-hot-toast";
import { Color } from "./ui/cssConstants";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import Booking from "./pages/Booking";
import LoginForm from "./features/Authentication/LoginForm";
import AuthProvider from "./features/Authentication/AuthProvider";
import ProtectedRoute from "./features/Authentication/ProtectedRoute";
import ToBeImplemented from "./ui/ToBeImplemented";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  const router = createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          element: <LoginForm />,
          path: "login",
        },
        {
          element: (
            <ProtectedRoute>
              <AppDashBoardLayout />
            </ProtectedRoute>
          ),
          path: "/",
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "rooms",
              element: <Room />,
            },
            {
              path: "bookings",
              element: <Booking />,
            },
            {
              path: "users",
              element: <ToBeImplemented />,
            },
            {
              path: "reviews",
              element: <ToBeImplemented />,
            },
            {
              path: "settings",
              element: <ToBeImplemented />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: Color.grey0,
            color: Color.grey700,
          },

          success: {
            duration: 2000,
          },
        }}
      />
      ;
    </QueryClientProvider>
  );
}

export default App;
