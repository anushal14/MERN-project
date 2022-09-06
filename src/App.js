import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return <BrowserRouter>
    <MainNavigation />
    <main>
      <Routes>
        <Route exact path="/" element={<Users />}></Route>
        <Route exact path="/places/new" element={<NewPlace />}></Route>
      </Routes>
    </main>
  </BrowserRouter>
}

export default App;
