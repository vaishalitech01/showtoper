import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* 🔐 Admin Pages */}
        <Route element={<AdminLayout />}>
          <Route path="/login" element={<LoginPage />} />

          {/* ✅ Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
