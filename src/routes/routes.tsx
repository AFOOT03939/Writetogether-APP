import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../features/mainPage/pages/mainPage';
import MainLayout from '../layout/pages/mainLayout';
import CategoryPage from '../features/categories/pages/categoryPage';
import ProfilePage from '../features/profile/pages/profilePage';
import StoryPage from '../features/stories/pages/storyPage';

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

        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />

        <Route
          path="/story"
          element={
            <MainLayout>
              <StoryPage />
            </MainLayout>
          }
        />

        <Route
          path="/story/:storyId"
          element={
            <MainLayout>
              <StoryPage />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}