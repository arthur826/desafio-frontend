import { useContext } from 'react';
import { ColaboradoresContext } from './ColaboradoresContext';

export const useColaboradores = () => {
  const context = useContext(ColaboradoresContext);
  if (!context) throw new Error("useColaboradores deve ser usado dentro de ColaboradoresProvider");
  return context;
};
