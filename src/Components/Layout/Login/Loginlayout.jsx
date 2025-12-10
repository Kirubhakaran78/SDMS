import React, { useState, Suspense, useCallback, useMemo, lazy, useTransition } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from '../../Login/LoginForm';

import SDMS_Logo from '../../../Assests/SDMS_Logo.webp';

const LoginImage = lazy(()=> import('./LoginImage'));
const CreatePassword = lazy(() => import('../../Login/CreatePassword'));
const ChangePassword = lazy(() => import('../../Login/ChangePassword'));

const Loginlayout = React.memo(function Loginlayout() {
  const [currentView, setCurrentView] = useState('login');
  
  const [isPending, startTransition] = useTransition();


  const handleNavigate = useCallback((view) => {
    startTransition(() => {
      setCurrentView(view);
    });
  }, []);

  const variants = useMemo(() => ({
    hidden: { opacity: 0, y: -25, transition: { duration: 0.35 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    enter: { opacity: 0, y: 25, transition: { duration: 0.35 } },
  }), []);

  const loadingFallback = useMemo(() => (
    <div className="flex items-center justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Loading...</span>
    </div>
  ), []);

  return (
    <>
      <div className="flex items-center justify-center font-sans p-10 min-h-screen gap-24 select-none">
        <div className="w-[27em] bg-white rounded-lg shadow-md px-10 pt-10 pb-20">
          <LogoSection />

          {isPending && (
            <div></div>
          )}

          <Suspense fallback={loadingFallback}>
            <motion.div
              initial="visible"
              animate={currentView === 'login' ? 'visible' : 'hidden'}
              variants={variants}
              style={{
                display: currentView === 'login' ? 'block' : 'none',
                opacity: isPending ? 0.6 : 1, 
                transition: 'opacity 0.2s',
              }}
            >
              <LoginForm onNavigate={handleNavigate} />
            </motion.div>

            <AnimatePresence mode="wait">
              {currentView !== 'login' && (
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0 }}
                  style={{
                    opacity: isPending ? 0.6 : 1, 
                  }}
                >
                  {currentView === 'createpassword' && <CreatePassword onNavigate={handleNavigate} />}
                  {currentView === 'changepassword' && <ChangePassword onNavigate={handleNavigate} />}
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </div>
        
        <Suspense fallback={loadingFallback} >
         <LoginImage />
        </Suspense>
      </div>
    </>
  );
});

const LogoSection = React.memo(function LogoSection() {
  return (
    <div className="flex items-center justify-start mb-8">
      <div>
         <img
          src={SDMS_Logo}
          alt="Logilab Logo"
          width="100px"
          loading="lazy"
         
        />
      </div>
      <div>
        <p className="text-[10px] mt-[-10px] text-gray-500 ms-[5px] font-bold">v7.2_20250520_01</p>
      </div>
    </div>
  );
});



export default Loginlayout;









