import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { CircularProgress,Switch } from '@material-ui/core';
import CustomerItem from '../CustomerItem/CustomerItem';
import classes from './merchantTable.module.css';

const MerchantTable = () => {

    const [merchant, setmerchant] = useState([]);
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

    let tableContent = <div style={{ position: 'fixed', top: '50%', right: '50%' }}><CircularProgress /></div>;

    if (merchant && merchant.length) {
        tableContent = (
            <table style={{ width: '100%' }} className={classes.customers}>
            <thead>
                <tr>
                    <th>Customer name (with avtar)</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Premium</th>
                    <th>{bidValue ? 'Max' : 'Min'} bid <span style={{ fontSize: '14px', fontWeight: 'normal' }}>(Min</span><Switch
                        checked={bidValue}
                        onChange={bidChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    /><span style={{ fontSize: '14px', fontWeight: 'normal' }}>Max)</span>
                        <button onClick={sortingHandler}>{asc ? 'Des' : 'Asc'}</button>
                    </th>
                </tr>
            </thead>
            {testData.map(customer => {
                return <CustomerItem key={customer.id} merchant={customer} bidValue={bidValue}  />
            })}
        </table>
            // <CustomerItem merchant={testData} bidValue={bidValue} bidChange={bidChange} asc={sortingHandler} isAsc={asc} />
        )
    }

    return tableContent;
}

export default MerchantTable;
