import { Routes, Route } from 'react-router-dom'
import { IsLoginProvider } from './components/Context/IsLogin'

//Import pages
import Home from './pages/Home/Home'
import NoPage from './pages/NoPage/NoPage'
import Login from './pages/Login/Login'
import MainLayout from './pages/MainLayout'
import Profile from './pages/Account/Profile'
import Settings from './pages/Account/Settings'
import AccountLayout from './pages/Account/AccountLayout'
import PrivacyPoliticals from './pages/Legals/PrivacyPolicy'
import Conditionals from './pages/Legals/Conditions'

//Style
import './styles/App.css'


function App() {
  return (
    <>
      <IsLoginProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPoliticals />} />
            <Route path="/terms-conditionals" element={<Conditionals />} />
            <Route path="account" element={<AccountLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </IsLoginProvider>
    </>
  )
}

export default App
