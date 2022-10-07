import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" exact="true" element={<Users />} />
        <Route path="/:userId/places" exact="true" element={<UserPlaces />} />
        <Route path="/places/new" exact="true" element={<NewPlace />} />
        <Route path="/places/:placeId" exact="true" element={<UpdatePlace />} />
        <Route path="*" exact="true" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact="true" element={<Users />} />
        <Route path="/:userId/places" exact="true" element={<UserPlaces />} />
        <Route path="/auth" exact="true" element={<Auth />} />
        <Route path="*" exact="true" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
