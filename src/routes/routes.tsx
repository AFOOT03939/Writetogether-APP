import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../features/mainPage/pages/mainPage';
import MainLayout from '../layout/pages/mainLayout';
import CategoryPage from '../features/categories/pages/categoryPage';

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

        <Route
          path="/categories"
          element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}