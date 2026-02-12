import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRefreshMutation } from "./services/authApi";
import {
  setCredentials,
  setInitialized,
} from "./store/reducers/authReducer";

const App = () => {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refresh().unwrap();
        dispatch(
          setCredentials({
            accessToken: response.data.accessToken,
            role: response.data.role,
          })
        );
      } catch {
        dispatch(setInitialized());
      }
    };

    initializeAuth();
  }, [refresh, dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
