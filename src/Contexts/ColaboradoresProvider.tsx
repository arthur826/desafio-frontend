import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ColaboradoresContext } from './ColaboradoresContext';
import type { Colaborador } from './ColaboradoresContext';

type Props = { children: ReactNode };

export const ColaboradoresProvider = ({ children }: Props) => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [buscarColaborador, setBuscarColaborador] = useState("");
  const [ordenar, setOrdenar] = useState<'asc' | 'desc'>("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [erro, setErro] = useState<Error | null>(null);


  const colaboradoresFiltrados = colaboradores.filter(colaborador => colaborador.name.toLowerCase().includes(buscarColaborador.toLowerCase()));

  const ordenarColaboradores = (colaboradores: Colaborador[]) => {
    return [...colaboradores].sort((a, b) => {
            if (ordenar === "asc") {
                return a.name.localeCompare(b.name);
            } 
                return b.name.localeCompare(a.name);
            });
    };

  const colaboradoresExibidos = ordenarColaboradores(colaboradoresFiltrados).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  //puxar total de cidades e empresas únicas
    const totalCidades = new Set(colaboradores.map(colaborador => colaborador.address.city)).size;
    const totalEmpresas = new Set(colaboradores.map(colaborador => colaborador.company.name)).size;

  const toggleOrdenar = () => setOrdenar(ordenar === 'asc' ? 'desc' : 'asc');

  const mensagemErro =
  !loading && colaboradoresFiltrados.length === 0
    ? "Nenhum colaborador encontrado."
    : "";


  //busca lista de colaboradores na API 
   useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        return response.json();
      })
      .then(data => {
        setColaboradores(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar colaboradores:', error);
        setErro(new Error('Ops! Não conseguimos carregar os colaboradores. Tente novamente mais tarde.'));
        setLoading(false);
      });
  }, []);

 return (
    <ColaboradoresContext.Provider
      value={{
        colaboradores,
        loading,
        buscarColaborador,
        setBuscarColaborador,
        ordenar,
        toggleOrdenar,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        colaboradoresExibidos,
        totalCidades,
        totalEmpresas,
        totalFiltrados: colaboradoresFiltrados.length,
        mensagemErro,
        erro
      }}
    >
      {children}
    </ColaboradoresContext.Provider>
  );
};