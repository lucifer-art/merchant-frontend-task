import { Avatar } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

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

    return <tbody>
            <tr key={props.merchant.id} onClick={customerDetailHandler}>
                <td><span><Avatar alt="Remy Sharp" src={props.merchant.image_url} /></span><span>{props.merchant.name}</span></td>
                <td>{props.merchant.email}</td>
                <td>{props.merchant.phone}</td>
                <td>{props.merchant.premium}</td>
                <td>{props.merchant.bids.length && props.bidValue ? props.merchant.bids.sort((a, b) => a.amount - b.amount)[props.merchant.bids.length - 1].amount : props.merchant.bids.length && !props.bidValue ? props.merchant.bids.sort((a, b) => a.amount - b.amount)[0].amount : 0}</td>
            </tr>
    </tbody>
}

export default CustomerItem;