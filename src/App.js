import { useState, useCallback, useEffect } from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UsePlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import Home from './shared/home';

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userId, setUserId] = useState()
  const login = useCallback((uid,token,expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem('userData',JSON.stringify({userId:uid,token:token,expiration: tokenExpirationDate.toISOString()}))
  },[])
  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    
    localStorage.removeItem('userData')
  },[])

  useEffect(()=>{
    if(token && tokenExpirationDate){
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
    logoutTimer = setTimeout(logout,remainingTime)
    }else{
      clearTimeout(logoutTimer)
    }
  },[token,logout,tokenExpirationDate])
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && new Date(storedData.expiration)>new Date()){
      login(storedData.userId,storedData.token,new Date(storedData.expiration))
    }
  },[login])

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/users" element={<Users />}></Route>
        <Route exact path="/:userId/places" element={<UserPlaces />}></Route>
        <Route exact path="/places/:placeId" element={<UpdatePlace />}></Route>
        <Route exact path="/places/new" element={<NewPlace />}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="//users" element={<Users />}></Route>
        <Route exact path="/:userId/places" element={<UserPlaces />}></Route>
        <Route exact path="/auth" element={<Auth />}></Route>
      </Routes>
    );
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token,token:token,userId:userId, login: login, logout: logout }}>
      {/* <BrowserRouter> */}
      <HashRouter>
        <MainNavigation />
       
        <main>
          {routes}
        </main>
        </HashRouter>
      {/* </BrowserRouter> */}
    </AuthContext.Provider>
  )
}

export default App;
