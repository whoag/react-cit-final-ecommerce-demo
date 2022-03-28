

import './style/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Women from "./pages/women";
import Men from "./pages/men";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Forgot from "./pages/auth/forgot";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Accessories from "./pages/accessories";
import { UserProvider } from "./contexts/User"
import Dashboard from "./pages/admin/Dashboard";
import Maps from "./pages/admin/Maps";
import Settings from "./pages/admin/Settings";
import React, {useState} from "react";
import Tables from "./pages/admin/Tables";

function App() {
  return (
   <>
     <UserProvider>
       <Navbar />
       <Router>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/product/:id" element={<Product/>} />
           <Route path="/clothes/women" element={<Women/>} />
           <Route path="/clothes/men" element={<Men/>} />
           <Route path="/accessories" element={<Accessories/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<Register/>}  />
           <Route path="/forgot" element={<Forgot/>}  />
           <Route path="/cart" element={<Cart/>}  />
           <Route path="/wishlist" element={<Wishlist/>}  />
           <Route path="/admin" element={<Dashboard/>}  />
           <Route path="/admin/maps" element={<Maps/>} />
           <Route path="/admin/settings" element={<Settings/>} />
           <Route path="/admin/tables" element={<Tables/>}/>
         </Routes>
       </Router>
     </UserProvider>

   </>
  );
}

export default App;
