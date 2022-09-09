import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UsePlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return <BrowserRouter>
    <MainNavigation />
    <main>
      <Routes>
        <Route exact path="/" element={<Users />}></Route>
        <Route exact path="/:userId/places" element={<UserPlaces />}></Route>
        <Route exact path="/places/:placeId" element={<UpdatePlace />}></Route>
        <Route exact path="/places/new" element={<NewPlace />}></Route>
        <Route exact path="/auth" element={<Auth />}></Route>
      </Routes>
    </main>
  </BrowserRouter>
}

export default App;
