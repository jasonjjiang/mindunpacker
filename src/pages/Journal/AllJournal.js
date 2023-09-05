import * as React from 'react';
import styled from 'styled-components';
import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PostAdd } from '@mui/icons-material';
import NavBar from '../../components/NavBar/NavBar';
import { api } from '../../api/api';



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976d2",
        color: "white",
        fontWeight: 600
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#D3D3D3"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function AllJournal() {

    const [journal, setJournal] = React.useState([]);

    React.useEffect(() => {
        api.get("api/journal/all").then((res) => {
            setJournal(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <NavBar coloured={true} />
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "start", alignItems: "center", marginTop: '40px' }}>
                <Typography variant='h4' component="h2" mb="1rem" fontWeight="700" >All Journals</Typography>
                <TableContainer sx={{ width: '90vw' }} component={Paper}>
                    <Button sx={{ margin: '10px' }} variant="outlined" href='/journal/new'>Add New</Button>
                    {journal.length === 0 && <Alert severity="info">Please Enter Some Records</Alert>}
                    {journal.length !== 0 && <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Entry</StyledTableCell>
                                <StyledTableCell align="left">Title</StyledTableCell>
                                <StyledTableCell align="left">Created At</StyledTableCell>
                                <StyledTableCell align="center">Actions&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {journal.map((row) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.entry.slice(0, 50)}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                                    <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button sx={{ marginRight: '10px' }} ><PostAdd /></Button>
                                        <Button><DeleteIcon /></Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>}
                </TableContainer>
            </div>
        </>
    );
}