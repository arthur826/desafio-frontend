import UserFoto from "../../assets/img/user.png"
import { CircularProgress, Box } from '@mui/material';

import Header from '../../Components/Header/header';
import DashboardCards from '../../Components/DashboardCards/DashboardCards';
import Search from '../../Components/Search/Search';
import ColaboradoresTable from '../../Components/ColaboradoresTable/ColaboradoresTable';
import { useColaboradores } from '../../Contexts/useColaboradores';


function TableColaboradores() {
     const {
    colaboradoresExibidos,
    loading,
    buscarColaborador,
    setBuscarColaborador,
    ordenar,
    toggleOrdenar,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalCidades,
    totalEmpresas,
    totalFiltrados,
    colaboradores,
  } = useColaboradores();

if (loading) {
    return <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
    >
      <CircularProgress />
    </Box>;
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
                onToggleOrder={toggleOrdenar}
            />

            <ColaboradoresTable
                colaboradores={colaboradoresExibidos}
                page={page}
                rowsPerPage={rowsPerPage}
                total={totalFiltrados}
                onPageChange={(e, p) => setPage(p)}
                onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
                }}
            />
        </>
    )
}

export default TableColaboradores;
