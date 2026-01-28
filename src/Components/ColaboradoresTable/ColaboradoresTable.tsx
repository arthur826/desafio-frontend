import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

type Colaborador = {
  id: number;
  name: string;
  email: string;
  address: { city: string };
  company: { name: string };
};

type ColaboradoresTableProps  = {
  colaboradores: Colaborador[];
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ColaboradoresTable({ colaboradores, page, rowsPerPage, total, onPageChange, onRowsPerPageChange }: ColaboradoresTableProps) {

  const headerCellStyle = {
    fontWeight: 600,
    color: "#373e4b",
    fontSize: "15px",
  };

  const cellStyle = {
    fontWeight: 500,
    color: "#838282",
    padding: "22px 16px",
  };

  return (
    <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={headerCellStyle}>Nome</TableCell>
            <TableCell sx={headerCellStyle}>E-mail</TableCell>
            <TableCell sx={headerCellStyle}>Cidade</TableCell>
            <TableCell sx={headerCellStyle}>Empresa</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {colaboradores.map((colaborador) => (
            <TableRow key={colaborador.id}>
              <TableCell sx={cellStyle}>{colaborador.name}</TableCell>
              <TableCell sx={cellStyle}>{colaborador.email}</TableCell>
              <TableCell sx={cellStyle}>{colaborador.address.city}</TableCell>
              <TableCell sx={cellStyle}>{colaborador.company.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Linhas por página:"
        rowsPerPageOptions={[4, 8, 10]}
      />
    </TableContainer>
  );
}

export default ColaboradoresTable;