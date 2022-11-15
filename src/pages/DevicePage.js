import { Button, CardMedia, Container, Divider, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';

const DevicePage = observer( () => {

    // const [deviceInfo, setDeviceInfo] = useState({info: []})
    const [device, setDevice] = useState({})
    const {id} = useParams()

    useEffect(() => {
      fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }));

    function createData(name, desc) {
        return { name, desc };
    }
    
    const rows = [
        createData('CPU Model', 'Intel'),
        createData('Ram Memory Installed Size', '16GB'),
        createData('Operating System', 'Linux'),
        createData('Card Description', 'NVIDIA GeForce'),
        createData('Hard Disk Size', '256GB'),
    ];

    return (
        <Container sx={{ height: '100vh' }}>
            <Box sx={{ mt: 3, display: {xs: 'block', sm: 'flex'}, justifyContent: 'space-around' }}>
                <Box>
                    <CardMedia
                        sx={{ maxWidth: 400}}
                        // xs={12} md={4}
                        component="img"
                        image={device.img ? process.env.REACT_APP_API_URL + device.img : null}
                    />
                </Box>
                <Box sx={{width: {xs: '90%', sm: '60vw'}, ml: 3}}>
                    <Typography
                        variant='h2'
                        sx={{ fontSize: {xs: 30, sm: 40} }}
                    >
                        {device.label}
                    </Typography>
                    <Divider sx={{mt: 1, mb: 1}} />
                    <Typography
                        variant='span'
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                    <Divider sx={{mt: 1, mb: 1}} />
                    <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Typography
                            variant='h4'
                        >
                            {device.price} $
                        </Typography>
                        <Button>
                            Add to cart
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{mt: 1, mb: 1}} />
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>About this item</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                                <StyledTableCell align="right">{row.desc}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Container>
    );
});

export default DevicePage;