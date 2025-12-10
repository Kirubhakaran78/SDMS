import React, { lazy ,Suspense, useMemo} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Errordialog from "./Components/Layout/Common/Errordialog";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import Loginlayout from "./Components/Layout/Login/Loginlayout";
import { LanguageProvider } from "./Context/LanguageContext";

const Home = lazy(() => import('./Pages/Home/Home'));

const PageWrapper = React.memo(({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -25 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className="min-h-screen w-full"
  >
    {children}
  </motion.div>
));

function AnimatedRouteWrapper({ element }) {
  return <PageWrapper>{element}</PageWrapper>;
}

function AnimatedRoutes() {
  const location = useLocation();
   const loadingFallback = useMemo(
    () => (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    ),
    []
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>

        {/* <Route path="/" element={<Navigate to="/Login" replace />} /> */}

        <Route path="/Login" element={<AnimatedRouteWrapper element={<Loginlayout />} />} />
      
        <Route
          path="/errordialog"
          element={<AnimatedRouteWrapper element={<Errordialog />} />}
        />
        {/* <Route path="/guid" 
        element={ <Suspense fallback={loadingFallback}><AnimatedRouteWrapper element={<Guid />} /> </Suspense> } /> */}

       
        <Route
          path="/Home"
          element={
            <Suspense fallback={loadingFallback}>
              <ProtectedRoute>
                <AnimatedRouteWrapper element={<Home />} />
              </ProtectedRoute>
            </Suspense>
          }
        />
       
      </Routes>
    </AnimatePresence>
  );
}

function App() {

   if (window.location.pathname === "/LogilabSDMS" || window.location.pathname === "/LogilabSDMS/") {
    window.location.replace("/LogilabSDMS/Login");
  }

  return (
    <LanguageProvider>
    <Router basename="/LogilabSDMS">
      <AnimatedRoutes />
    </Router>
    </LanguageProvider>
  );
}

export default App;

