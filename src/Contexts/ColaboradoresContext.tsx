import { createContext } from 'react';

export type Colaborador = {
  id: number;
  name: string;
  email: string;
  address: { city: string };
  company: { name: string };
};

export type ColaboradoresContextType = {
  colaboradores: Colaborador[];
  loading: boolean;
  buscarColaborador: string;
  setBuscarColaborador: (value: string) => void;
  ordenar: 'asc' | 'desc';
  toggleOrdenar: () => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  colaboradoresExibidos: Colaborador[];
  totalCidades: number;
  totalEmpresas: number;
  totalFiltrados: number;
  mensagemErro: string;
};

export const ColaboradoresContext = createContext<ColaboradoresContextType | undefined>(undefined);