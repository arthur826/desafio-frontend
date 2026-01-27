import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { useEffect, useState } from 'react';

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
const colaboradoresExibidos = ordenarColaboradores(colaboradoresFiltrados);

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

    return (
        <>
            <TextField id="outlined-basic" label="Buscar colaborador" variant="outlined" value={buscarColaborador} onChange={(e) => setBuscarColaborador(e.target.value)} />
            <button onClick={() => setOrdenar(ordenar === "asc" ? "desc" : "asc")}>Ordenar</button>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">E-mail</TableCell>
                    <TableCell align="right">Cidade</TableCell>
                    <TableCell align="right">Empresa</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {colaboradoresExibidos.map(colaborador => (
                    <TableRow
                    key={colaborador.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {colaborador.name}
                    </TableCell>
                    <TableCell align="right">{colaborador.email}</TableCell>
                    <TableCell align="right">{colaborador.address.city}</TableCell>
                    <TableCell align="right">{colaborador.company.name}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}

export default TableColaboradores;
