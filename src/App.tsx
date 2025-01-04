import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.tsx'
import NoPage from './pages/NoPage/NoPage'
import Login from './pages/Login/Login'
import MainLayout from './pages/MainLayout'
import Profile from './pages/Account/Profile'
import Settings from './pages/Account/Settings'
import AccountLayout from './pages/Account/AccountLayout';
import './styles/App.css'

function App() {

  return (
    <>
      <Routes>


        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="account" element={<AccountLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  )
}

export default App
