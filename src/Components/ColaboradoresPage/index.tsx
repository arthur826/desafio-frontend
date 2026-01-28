import { useEffect, useState } from 'react';
import UserFoto from "../../assets/img/user.png"

import Header from '../Header/header';
import DashboardCards from '../DashboardCards/DashboardCards';
import Search from '../Search/Search';
import ColaboradoresTable from '../ColaboradoresTable/ColaboradoresTable';

//tipo de dados do colaborador
type Colaborador = {
    id: number;
    name: string;
    email: string;
    address: {
        city: string;
    };
    company: {
        name: string;
    }
}

function TableColaboradores() {

//dados
const [ colaboradores, setColaboradores ] = useState<Colaborador[]>([]);
const [ loading, setLoading ] = useState(true);

//filtros e ordenação
const [ buscarColaborador, setBuscarColaborador ] = useState("");
const [ ordenar, setOrdenar ] = useState<'asc' | 'desc'>("asc");

//logica de paginação
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(4);

//filtro de colaboradores por nome
const colaboradoresFiltrados = colaboradores.filter(colaborador => colaborador.name.toLowerCase().includes(buscarColaborador.toLowerCase()));

//função de ordenação
const ordenarColaboradores = (colaboradores: Colaborador[]) => {
    return [...colaboradores].sort((a, b) => {
        if (ordenar === "asc") {
            return a.name.localeCompare(b.name);
        } 
            return b.name.localeCompare(a.name);
        });
};

const colaboradoresOrdenados = ordenarColaboradores(colaboradoresFiltrados);

const colaboradoresExibidos = colaboradoresOrdenados.slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
);

//puxar total de cidades e empresas únicas
const totalCidades = new Set(colaboradores.map(colaborador => colaborador.address.city)).size;
const totalEmpresas = new Set(colaboradores.map(colaborador => colaborador.company.name)).size;

const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
}
const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
}

//busca lista de colaboradores na API 
useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        setColaboradores(data);
        setLoading(false);
    })
    .catch(error => {
        console.error('Erro ao buscar colaboradores:', error);
        setLoading(false);
    });
}, []);

if (loading) {
    return <div>Carregando colaboradores...</div>;
}

    return (
        <>
            <Header
                title="Colaboradores"
                subtitle="Lista de colaboradores da empresa"
                userPhoto={UserFoto}
            />
           
            <DashboardCards
                totalColaboradores={colaboradores.length}
                totalCidades={totalCidades}
                totalEmpresas={totalEmpresas}
            />

            <Search
                search={buscarColaborador}
                onSearchChange={(value) => {
                    setBuscarColaborador(value);
                    setPage(0);
                }}
                order={ordenar}
                onToggleOrder={() => setOrdenar(ordenar === "asc" ? "desc" : "asc")}
            />

            <ColaboradoresTable
                colaboradores={colaboradoresExibidos}
                page={page}
                rowsPerPage={rowsPerPage}
                total={colaboradoresFiltrados.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default TableColaboradores;
