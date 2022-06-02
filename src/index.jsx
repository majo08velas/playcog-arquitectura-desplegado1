import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from  'react-router-dom'
//styles 
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//components
import NewAccount from './components/Account/NewAccount/NewAccount';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LogIn from './components/Account/LogIn/LogIn';
import DeleteEditAccount from './components/Account/DeleteEditAccount/DeleteEditAccount';
import Users from './Users';
import ForgetPass from './components/Account/ForgetPass/ForgetPass';
import Home from './components/Home/Home';
import { ListVideogame } from './components/Videogames/ListVideogame/ListVideogame';
import { Aboutus } from './components/AboutUs/Aboutus';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <><React.StrictMode>
    <Users />
    </React.StrictMode>
    <BrowserRouter>
      <Navbar></Navbar>
      <div className='container'>
        <Routes>
          <Route path='/' element={<LogIn></LogIn>} />
          <Route path='/login' element={<LogIn></LogIn>} />
          <Route path='/newaccount' element={<NewAccount></NewAccount>} />
          <Route path='/deleteEditaccount' element={<DeleteEditAccount></DeleteEditAccount>} />
          <Route path='/forgetPass' element={<ForgetPass></ForgetPass>} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='/videojuegos' element={<ListVideogame></ListVideogame>} />
          <Route path='/aboutus' element={<Aboutus></Aboutus>} />
        </Routes>
      </div>
      <Footer></Footer>
    </BrowserRouter></>
);
