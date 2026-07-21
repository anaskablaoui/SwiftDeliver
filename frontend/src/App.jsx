import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Auth Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ProtectedRoute from './pages/Auth/protectedRoutes'

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
import MissionOffers from './pages/Livreur/offreMission'

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
        <Route path='/client/dashboard' element={<ProtectedRoute allowedRole="client"><ClientDashboard /></ProtectedRoute>} />
        <Route path='/client/new-order' element={<ProtectedRoute allowedRole="client"><NewOrder /></ProtectedRoute>} />
        <Route path='/client/order/:id' element={<ProtectedRoute allowedRole="client"><OrderDetails /></ProtectedRoute>} />
        <Route path='/client/order-history' element={<ProtectedRoute allowedRole="client"><OrderHistory /></ProtectedRoute>} />
        <Route path='/client/profile' element={<ProtectedRoute allowedRole="client"><Profile /></ProtectedRoute>} />

        {/* Livreur Pages */}
        <Route path='/livreur/dashboard' element={<ProtectedRoute allowedRole="livreur"><LivreurDashboard /></ProtectedRoute>} />
        <Route path='/livreur/deliveries' element={<ProtectedRoute allowedRole="livreur"><MyDeliveries /></ProtectedRoute>} />
        <Route path='/livreur/delivery/:id' element={<ProtectedRoute allowedRole="livreur"><DeliveryDetails /></ProtectedRoute>} />
        <Route path='/livreur/Mission/:id' element={<ProtectedRoute allowedRole="livreur"><Mission/></ProtectedRoute>}/>
        <Route path='/livreur/offre/Mission' element={<ProtectedRoute allowedRole="livreur"> <MissionOffers/> </ProtectedRoute>}/>

        {/* Admin Pages */}
        <Route path='/admin/dashboard' element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path='/admin/orders' element={<ProtectedRoute allowedRole="admin"><Orders /></ProtectedRoute>} />
        <Route path='/admin/livreurs' element={<ProtectedRoute allowedRole="admin"><Livreurs /></ProtectedRoute>} />
        <Route path='/admin/new-livreur' element={<ProtectedRoute allowedRole="admin"><NewLivreur /></ProtectedRoute>}/>
        <Route path='/admin/clients' element={<ProtectedRoute allowedRole="admin"><Clients /></ProtectedRoute>} />
        <Route path='/admin/settings' element={<ProtectedRoute allowedRole="admin"><Settings /></ProtectedRoute>} />
        <Route path='/admin/order/:id' element={<ProtectedRoute allowedRole="admin"><OrderDetailsAdmin/></ProtectedRoute>} ></Route>
        <Route path='/admin/new-order' element={<ProtectedRoute allowedRole="admin"><NewOrderAdmin/></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
