import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "./api/auth";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { getTracks } from "./api/getTracks";
import { RootState } from "./store";
import { setToken } from "./store/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await auth();
      if (response) {
        dispatch(setToken(response));
      }
    };

    const fetchTracks = async () => {
      if (token) {
        const response = await getTracks(token);
        if (response) {
          console.log(response);
        }
      }
    };

    fetchToken();
    fetchTracks();
  }, [token, dispatch]);

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
