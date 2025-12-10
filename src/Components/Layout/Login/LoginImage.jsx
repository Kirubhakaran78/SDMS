import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SDMS_Logo from '../../../Assests/SDMS_Logo.webp';
import Documents_icon from '../../../Assests/documentfiles.webp'
import Gateway_icon from '../../../Assests/application-gateway.webp'
import Database_icon from '../../../Assests/dataOrientedApp.webp'
import Instrument_icon from '../../../Assests/instrumentdata.webp'

const typeconfig = [
  {
    id: 'documents',
    icon: Documents_icon,
    key: 'loginImage.documents',
    position: 'top-0 left-1/2 -translate-x-1/2',
  },
  {
    id: 'gateway',
    icon: Gateway_icon,
    key: 'loginImage.gateway',
    position: 'top-1/2 right-0 -translate-y-1/2 translate-x-1/1',
  },
  {
    id: 'database',
    icon: Database_icon,
    key: 'loginImage.database',
    position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/1',
  },
  {
    id: 'instrument',
    icon: Instrument_icon,
    key: 'loginImage.instrument',
    position: 'top-1/2 left-0 -translate-y-1/2 -translate-x-1/1',
  },
];


const circle =
  'absolute w-[120px] h-[120px] bg-white rounded-full shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center p-2';

const Node = React.memo(({ node }) => {
  const { t } = useTranslation();

  return (
    <div className={`${circle} ${node.position}`}>
      <img
        src={node.icon}
        alt={t(node.key)}
        className="w-7 h-7 mb-1"
        loading="lazy"
        decoding="async"
      />
      <p className="text-sm text-gray-700/80 font-bold">{t(node.key)}</p>
    </div>
  );
});

const LoginImage = React.memo(() => {

  useEffect(() => {
    typeconfig.forEach((node) => {
      const img = new Image();
      img.src = node.icon;
    });
  }, []);

  const nodeElements = useMemo(
    () => typeconfig.map((node) => <Node key={node.id} node={node} />),
    []
  );

  return (
    <div className="relative w-[420px] h-[420px] font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-dotted border-blue-400 rounded-full" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-blue-600 z-0">
        <img
          src={SDMS_Logo}
          alt="SDMS Logo"
          width="120px"
          loading="lazy"
        />
      </div>

      {nodeElements}
    </div>
  );
});

export default LoginImage;

