import { Avatar } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { TableCell,TableRow,Grid,Typography} from '@material-ui/core';

const CustomerItem = props => {

    const history = useHistory();
    const location = useLocation();

    const customerDetailHandler = (event) => {
        event.preventDefault();
        console.log(event,props.merchant);
        history.push({
            pathname: location.pathname + 'customerDetail',
            search: `?merchant=${JSON.stringify(props.merchant)}`
        })
    }

    return <TableRow onClick={customerDetailHandler} style={{ cursor: 'pointer' }}>
        <TableCell>
            <Grid container>
                <Grid item lg={2}>
                    <Avatar alt="Remy Sharp" src={props.merchant.image_url} />
                </Grid>
                <Grid item lg={10}>
                    <Typography>{props.merchant.name}</Typography>
                </Grid>
            </Grid>
            <span></span><span></span>
        </TableCell>
        <TableCell align="left">{props.merchant.email}</TableCell>
        <TableCell align="left">{props.merchant.phone}</TableCell>
        <TableCell align="left">{props.merchant.premium}</TableCell>
        <TableCell align="left">{props.merchant.bids.length && props.bidValue ? props.merchant.bids.sort((a, b) => a.amount - b.amount)[props.merchant.bids.length - 1].amount : props.merchant.bids.length && !props.bidValue ? props.merchant.bids.sort((a, b) => a.amount - b.amount)[0].amount : 0}</TableCell>
    </TableRow>
}

export default CustomerItem;