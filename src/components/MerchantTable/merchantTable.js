import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { CircularProgress,Switch } from '@material-ui/core';
import CustomerItem from '../CustomerItem/CustomerItem';
import classes from './merchantTable.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TablePagination,Paper} from '@material-ui/core';

const MerchantTable = () => {
    
    const [merchant, setmerchant] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [bidValue, setbidValue] = useState(true);
    const [asc, setasc] = useState(false);

    useEffect(() => {
        axios.get('https://intense-tor-76305.herokuapp.com/merchants').then(response => {
            if (response.status === 200) {
                setmerchant(response.data.map(customer => {
                    return {
                        id: customer.id,
                        name: customer.firstname + ' ' + customer.lastname,
                        image_url: customer.avatarUrl,
                        email: customer.email,
                        phone: customer.phone,
                        premium: customer.hasPremium ? 'Yes' : 'No',
                        amount: customer.bids.length && bidValue ? customer.bids.sort((a, b) => a.amount - b.amount)[customer.bids.length - 1].amount : customer.bids.length && !bidValue ? customer.bids.sort((a, b) => a.amount - b.amount)[0].amount : 0,
                        bids: customer.bids
                    }
                }))
            }
        }).catch(err => {
            console.log(err);
        })
    }, [bidValue])

    const bidChange = () => {
        setbidValue(bidValue => !bidValue);
    }

    const testData = useMemo(() => {
        const customerData = [...merchant];
        if (asc) {
            return customerData.sort((a, b) => a.amount - b.amount)
        } else {
            return customerData.sort((a, b) => b.amount - a.amount)
        }
    }, [merchant, asc])


    const sortingHandler = () => {
        setasc(prevState => !prevState)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let tableContent = <div style={{ position: 'fixed', top: '50%', right: '50%' }}><CircularProgress /></div>;

    if (merchant && merchant.length) {
        tableContent = (
            <Paper>
                <TableContainer>
                    <Table className={classes.customers} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer name (with avtar)</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Premium</TableCell>
                                <TableCell align="right"><span style={{ cursor: 'pointer' }} onClick={sortingHandler}>{bidValue ? 'Max' : 'Min'} bid<span>{asc ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}</span></span> <span style={{ fontSize: '14px', fontWeight: 'normal' }}>  (Min</span><Switch
                                    checked={bidValue}
                                    onChange={bidChange}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /><span style={{ fontSize: '14px', fontWeight: 'normal' }}>Max)</span></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(customer => {
                                return <CustomerItem key={customer.id} merchant={customer} bidValue={bidValue} />
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination align="right"
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={testData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        )
    }

    return tableContent;
}

export default MerchantTable;
