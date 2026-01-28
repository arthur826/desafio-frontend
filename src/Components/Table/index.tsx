import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpDown } from '@fortawesome/free-solid-svg-icons'
import UserFoto from "../../assets/img/user.png"

import {
  faUsers,
  faBuilding,
  faCity
} from '@fortawesome/free-solid-svg-icons'

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

const [ colaboradores, setColaboradores ] = useState<Colaborador[]>([]);
const [ loading, setLoading ] = useState(true);
const [ buscarColaborador, setBuscarColaborador ] = useState("");
const [ ordenar, setOrdenar ] = useState("asc");

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

//puxar total de cidades e empresas únicas
const totalCidades = new Set(colaboradores.map(colaborador => colaborador.address.city)).size;
const totalEmpresas = new Set(colaboradores.map(colaborador => colaborador.company.name)).size;

//logica de paginação
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(4);

const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
}

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
}

const colaboradoresOrdenados = ordenarColaboradores(colaboradoresFiltrados);

const colaboradoresExibidos = colaboradoresOrdenados.slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
);

//chamada para a API
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
    return <div>Carregando</div>;
}

//estilos

const headerCellStyle = {
  fontWeight: 600,
  color: '#373e4b',
  fontSize: '15px'
};

const cellStyle = {
   fontWeight: 500,
    color: '#838282',
    padding: '22px 16px'
};
    return (
        <>
            <div className="cabecalho">
                <div className="left">
                    <h2>Colaboradores</h2>
                    <p>Visualize e gerencie os colaboradores da empresa</p>
                </div>
                <div className="foto-user">
                    <img src={UserFoto} alt="Foto do usuário" />
                </div>
            </div>
            <ul className='cards-dados'>
                <li>
                    <FontAwesomeIcon 
                    icon={faUsers}
                    style={{ color: '#2c70c8', fontSize: '34px' }}
                    />
                    <div className="txt">
                        <h3>Total de colaboradores</h3>
                        <p>{colaboradores.length}</p>
                    </div>
                </li>
                 <li>
                    <FontAwesomeIcon 
                        icon={faCity} 
                        style={{ color: '#2c70c8', fontSize: '34px' }}
                    />
                    <div className="txt">
                        <h3>Cidades Diferentes</h3>
                        <p>{totalCidades}</p>
                    </div>
                </li>
                 <li>
                    <FontAwesomeIcon 
                        icon={faBuilding}
                        style={{ color: '#2c70c8', fontSize: '34px' }}
                    />
                    <div className="txt">
                        <h3>Total de Empresas</h3>
                        <p>{totalEmpresas}</p>
                    </div>
                </li>
            </ul>
            <div className='buscar'>
                <input
                    type="text"
                    placeholder="Buscar colaborador pelo nome..."
                    value={buscarColaborador}
                    onChange={(e) => setBuscarColaborador(e.target.value)}
                />
                <button onClick={() => setOrdenar(ordenar === "asc" ? "desc" : "asc")}>Ordenar (A - Z) 
                    <FontAwesomeIcon
                        icon={faUpDown}
                        style={{ color: '#2c70c8', fontSize: '18px' }}
                    />
                </button>
            </div>
            <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell  sx={headerCellStyle}>Nome</TableCell>
                        <TableCell  sx={headerCellStyle} align="left">E-mail</TableCell>
                        <TableCell  sx={headerCellStyle} align="left">Cidade</TableCell>
                        <TableCell  sx={headerCellStyle} align="left">Empresa</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {colaboradoresExibidos.map(colaborador => (
                        <TableRow
                        key={colaborador.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell sx={cellStyle} component="th" scope="row">
                            {colaborador.name}
                        </TableCell>
                        <TableCell sx={cellStyle} align="left">{colaborador.email}</TableCell>
                        <TableCell sx={cellStyle} align="left">{colaborador.address.city}</TableCell>
                        <TableCell sx={cellStyle} align="left">{colaborador.company.name}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <TablePagination
                sx={{ border: "1px solid #dfdfdf" }}
                component="div"
                count={colaboradoresFiltrados.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Linhas por página:"
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[4, 8, 10]}
                />
            </TableContainer>
        </>
    )
}

export default TableColaboradores;
