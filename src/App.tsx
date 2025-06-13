import { Routes, Route, Navigate } from 'react-router-dom'

//Import pages
import Home from './pages/Home/Home'
import NoPage from './pages/NoPage/NoPage'
import MainLayout from './pages/MainLayout'
import Profile from 'modules/account/pages/Profile'
import Settings from 'modules/account/pages/Settings'
import AccountLayout from 'modules/account/layout/AccountLayout'
import PrivacyPoliticals from './pages/Legals/PrivacyPolicy'
import Conditionals from './pages/Legals/Conditions'
import ServiceProviderPage from 'modules/service-provider/public/pages/ServiceProviderPage'
import MainServices from 'modules/services/pages/MainServices'
import ServiceProviderConfigPage from 'modules/service-provider/account/config-page/pages/ServiceProviderConfigPage'
import LoginGooglePage from 'modules/auth/pages/LoginGooglePage'

//Context
import ServiceProvider from 'modules/services/context/providerServicesContext';
import UserProvider from 'modules/user/context/userContext'

//Import routes
import ServiceProviderFormRoutes from 'modules/service-provider/account/config-page/routes/FormRoutes'

//Import guards
import { ValidateSlugRoute, RequireAuth, RedirectIfAuth } from 'guards/index'

//Style
import './styles/App.css'


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
                <Route path="service-provider/:route" element={
                    <ValidateSlugRoute>
                        <ServiceProviderConfigPage />
                    </ValidateSlugRoute>
                }>
                    <Route path="forms">
                        {ServiceProviderFormRoutes()}
                        <Route path="*" element={<Navigate to="/404" replace />} />
                    </Route>
                </Route>
              </Route>

            </Route>
            <Route path="/login" element={<RedirectIfAuth><LoginGooglePage /></RedirectIfAuth>} />
            {/* Feature: Login y Register con manejo de encriptacion de contraseñas
            <Route path="/login" element={<RedirectIfAuth><LoginPage /></RedirectIfAuth>} />
            <Route path="/register" element={<RedirectIfAuth><RegisterPage /></RedirectIfAuth>} />
            */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </ServiceProvider>
      </UserProvider >
    </>
  )
}

export default App
