import { Routes, Route, Navigate } from 'react-router-dom'

//Import pages
import Home from './pages/Home/Home'
import NoPage from './pages/NoPage/NoPage'
import MainLayout from './pages/MainLayout'
import Profile from './modules/user/pages/Profile'
import Settings from './modules/user/pages/Settings'
import AccountLayout from './modules/account/layout/AccountLayout'
import LoginPage from './modules/auth/pages/LoginPage'
import PrivacyPoliticals from './pages/Legals/PrivacyPolicy'
import Conditionals from './pages/Legals/Conditions'
import ServiceProviderPage from './modules/service-provider/public/pages/ServiceProviderPage'
import MainServices from './modules/services/pages/MainServices'
import ServiceProviderConfigPage from './modules/service-provider/account/config-page/pages/ServiceProviderConfigPage'
import ServiceProviderPagePrueba from './types/prueba'

//Context
import ServiceProvider from './modules/services/context/providerServicesContext';
import UserProvider from './modules/user/context/userContext'

//Import routes
import ServiceProviderFormRoutes from './modules/service-provider/account/config-page/routes/FormRoutes'

//Import guards
import ValidateSlugRoute from './guards/ValidateSlugRoute'
import RequireAuth from './guards/ValidateLogin'

//Style
import './styles/App.css'
import LoginProvider from './modules/auth/pages/LoginProvider'


function App() {
  return (
    <>
      <UserProvider>
        <ServiceProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/services" element={<MainServices />} />
              <Route path="/services/:slug" element={<ServiceProviderPage />} />
              <Route path="/privacy-policy" element={<PrivacyPoliticals />} />
              <Route path="/terms-conditionals" element={<Conditionals />} />

              <Route path="/account" element={
                <RequireAuth>
                  <AccountLayout />
                </RequireAuth>}>

                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path=":slug" element={
                  <ValidateSlugRoute>
                    <ServiceProviderConfigPage />
                  </ValidateSlugRoute>
                }>
                  <Route path="edit">
                    {ServiceProviderFormRoutes()}
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Route>
                </Route>
              </Route>

            </Route>
            {/* Crear una proteccion para login */}
            <Route path="/login" element={<LoginPage />} />
            {/* Solo son pruebas */}
            <Route path="/login-provider" element={<LoginProvider />} />
            <Route path="/prueba" element={<ServiceProviderPagePrueba />} />
            {/* Fin de pruebas */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </ServiceProvider>
      </UserProvider >
    </>
  )
}

export default App
