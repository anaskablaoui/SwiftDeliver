import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Auth Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// Client Pages
import ClientDashboard from './pages/Client/Dashboard'
import NewOrder from './pages/Client/NewOrder'
import OrderDetails from './pages/Client/OrderDetails'
import OrderHistory from './pages/Client/OrderHistory'
import Profile from './pages/Client/Profile'

// Livreur Pages
import LivreurDashboard from './pages/Livreur/Dashboard'
import MyDeliveries from './pages/Livreur/MyDeliveries'
import DeliveryDetails from './pages/Livreur/DeliveryDetails'
import Mission from './pages/Livreur/Mission'

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard'
import Orders from './pages/Admin/Orders'
import Livreurs from './pages/Admin/Livreurs'
import Clients from './pages/Admin/Clients'
import Settings from './pages/Admin/Settings'
import OrderDetailsAdmin from './pages/Admin/OrderDetails'
import NewOrderAdmin from './pages/Admin/NewOrder'
import NewLivreur from './pages/Admin/newLivreur'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Client Pages */}
        <Route path='/client/dashboard' element={<ClientDashboard />} />
        <Route path='/client/new-order' element={<NewOrder />} />
        <Route path='/client/order/:id' element={<OrderDetails />} />
        <Route path='/client/order-history' element={<OrderHistory />} />
        <Route path='/client/profile' element={<Profile />} />

        {/* Livreur Pages */}
        <Route path='/livreur/dashboard' element={<LivreurDashboard />} />
        <Route path='/livreur/deliveries' element={<MyDeliveries />} />
        <Route path='/livreur/delivery/:id' element={<DeliveryDetails />} />
        <Route path='/livreur/Mission/:id' element={<Mission/>}/>

        {/* Admin Pages */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/admin/livreurs' element={<Livreurs />} />
        <Route path='/admin/new-livreur' element={<NewLivreur />}/>
        <Route path='/admin/clients' element={<Clients />} />
        <Route path='/admin/settings' element={<Settings />} />
        <Route path='/admin/order/:id' element={<OrderDetailsAdmin/>} ></Route>
        <Route path='/admin/new-order' element={<NewOrderAdmin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
