import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import { UserRoute } from './components/common/GuardedRoute';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<UserRoute />}>
            <Route path='/' element={<Home />}></Route>
          </Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
