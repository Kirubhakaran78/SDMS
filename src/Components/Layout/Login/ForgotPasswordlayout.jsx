import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";


function ForgotPasswordlayout({ children, onClose }) {
    const { t } = useTranslation();

  return (
    <div className="bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-200">
      <div className="flex justify-between items-center bg-blue-50 px-4 py-3 border-b">
        <h2 className="text-[18px] font-semibold text-blue-700">{t("login.forgotpassword")}</h2>
        <RxCross2
          className="text-[20px] text-gray-500 cursor-pointer font-bold hover:text-red-500 transition-all hover:scale-90"
          onClick={onClose} 
        />
      </div>
      {children}
    </div>
  );
}


export default React.memo(ForgotPasswordlayout)