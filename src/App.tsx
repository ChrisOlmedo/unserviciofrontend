import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/userContext'

//Import pages
import Home from './pages/Home/Home'
import NoPage from './pages/NoPage/NoPage'
import Login from './pages/Login/Login'
import MainLayout from './pages/MainLayout'
import Profile from './pages/Account/UserAccount/Profile'
import Settings from './pages/Account/Settings'
import AccountLayout from './pages/Account/AccountLayout'
import PrivacyPoliticals from './pages/Legals/PrivacyPolicy'
import Conditionals from './pages/Legals/Conditions'
import ServiceProviderPage from './pages/Services/ServiceProviderPage'
import MainServices from './pages/Services/MainServices'
import ServiceProvider from './context/providerServicesContext';
import ServiceProviderConfigPage from './pages/Account/ServiceAccount/ServiceProviderConfigPage'
import SelectServiceProviderForm from './components/ServiceProviderForm/SelectServiceProviderForm'

//Style
import './styles/App.css'
import LoginProvider from './pages/Login/LoginProvider'


function App() {
  return (
    <>
      <UserProvider>
        <ServiceProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/services" element={<MainServices />} />
              <Route path="services/:slug" element={<ServiceProviderPage />} />
              <Route path="/privacy-policy" element={<PrivacyPoliticals />} />
              <Route path="/terms-conditionals" element={<Conditionals />} />
              <Route path="/account" element={<AccountLayout />}>
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                {/* 
                                *
                                *
                                * Proxima actualizacion, agregar al usuario un campo que contenga el slug de su pagina
                                * por defecto debera llevar un nombre como "Mi pagina" y el slug sera "mi-pagina"
                                * 
                                * <Link className="nav-link text-light" to="/account/:slug">Crear mi página</Link>
                                * <Route path=":slug" element={<CreateServicePage />}>
                                * 
                                */}
                <Route path="bepartner" element={<ServiceProviderConfigPage />}>
                  <Route path=":section/edit" element={<SelectServiceProviderForm />} />
                </Route>
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
            {/* Solo son pruebas */}
            <Route path="/login-provider" element={<LoginProvider />} />
          </Routes>
        </ServiceProvider>
      </UserProvider >
    </>
  )
}

export default App
