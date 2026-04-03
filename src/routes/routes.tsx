import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../features/mainPage/pages/mainPage';
import MainLayout from '../layout/pages/mainLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <MainLayout>
              <MainPage />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}