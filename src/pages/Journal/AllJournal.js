import * as React from 'react';
import styled from 'styled-components';
import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PostAdd } from '@mui/icons-material';
import NavBar from '../../components/NavBar/NavBar';
import { api } from '../../api/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import { useSpring, animated } from '@react-spring/web';
import dayjs from 'dayjs';

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
    const [changed, isChanged] = React.useState(false);

    React.useEffect(() => {
        api.get("api/journal/all").then((res) => {
            setJournal(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [changed])

    const [selectedJournal, setSelectedJournal] = React.useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const deleteModalHandler = (id) => {
        setSelectedJournal(id);
        handleOpen();
    }
    const deleteHandler = () => {
        api.delete(`api/journal/delete/${selectedJournal}`).then(() => {
            isChanged(prev => !prev);
            handleClose();
        }).catch((err) => { })
    }

    return (
        <>
            <NavBar coloured={true} />
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "start", alignItems: "center", marginTop: '40px' }}>
                <Typography variant='h4' component="h2" mb="1rem" fontWeight="700" >All Journals</Typography>
                <TableContainer sx={{ width: '90vw' }} component={Paper}>
                    <Link to="/journal/new">
                        <Button sx={{ margin: '10px' }} variant="outlined" >Add New</Button>
                    </Link>
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
                                    <StyledTableCell align="left">
                                        {dayjs(
                                            `${row.createdAt.split("T")[0]} ${row.createdAt.split("T")[1]
                                            }`
                                        ).format("MMM D YYYY, h:mm a")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Link to={`/journal/edit/${row._id}`} >
                                            <Button sx={{ marginRight: '10px' }} ><PostAdd /></Button>
                                        </Link>
                                        <Button onClick={deleteModalHandler.bind(null, row._id)} ><DeleteIcon /></Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>}
                </TableContainer>
            </div>

            <StyledModal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <h2 style={{ marginBottom: '10px' }} id="spring-modal-title">Delete</h2>
                        <span id="spring-modal-description" >
                            Are You Sure You Want to Delete?
                        </span>
                        <div style={{ marginTop: '10px' }}>
                            <Button variant='contained' color='error' onClick={deleteHandler}>Delete</Button>
                            <Button sx={{ marginLeft: '10px' }} variant='contained' color='success' onClick={handleClose}>Cancel</Button>
                        </div>
                    </Box>
                </Fade>
            </StyledModal>

        </>
    );
}

const Backdrop = React.forwardRef((props, ref) => {
    const { open, ...other } = props;
    return <Fade ref={ref} in={open} {...other} />;
});

Backdrop.propTypes = {
    open: PropTypes.bool.isRequired,
};

const StyledModal = styled(Modal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

const style = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
    boxShadow: 16,
});
