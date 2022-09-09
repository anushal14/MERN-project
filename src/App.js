import { useState, useCallback } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UsePlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = useCallback(() => {
    setIsLoggedIn(true)
  })
  const logout = useCallback(() => {
    setIsLoggedIn(false)
  })

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />}></Route>
        <Route exact path="/:userId/places" element={<UserPlaces />}></Route>
        <Route exact path="/places/:placeId" element={<UpdatePlace />}></Route>
        <Route exact path="/places/new" element={<NewPlace />}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />}></Route>
        <Route exact path="/:userId/places" element={<UserPlaces />}></Route>
        <Route exact path="/auth" element={<Auth />}></Route>
      </Routes>
    );
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <BrowserRouter>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
