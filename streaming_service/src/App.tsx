import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Main } from './components/Main';
import { AuthPage } from './components/AuthPage';
import { useProtectedRoute } from './hooks/useProtectedRoute';

function App() {
  const ProtectedRoute = useProtectedRoute;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Main />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
