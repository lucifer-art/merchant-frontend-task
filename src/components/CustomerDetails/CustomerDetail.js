import { useLocation,useHistory } from 'react-router-dom';
import { Fragment } from 'react'
import classes from './CustomerDetail.module.css';
import { Button } from '@material-ui/core';
import Card from '../UI/Card/Card';

const CustomerDetail = props => {

    const location = useLocation();
    const history = useHistory();

    const queryParams = new URLSearchParams(location.search);
    const data = JSON.parse(queryParams.get('merchant'));
    
    const goBack= () => {
        history.replace('/');
    }

    return (
        <Fragment>
            <div className={classes.profile_detail}>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <Button variant="contained" color="primary" onClick={goBack}>
                        Go Back
                </Button>
                </div>
                <div className={classes.profile_pic}>
                    <img src={data.image_url} alt='avtaar' />
                </div>
                <Card>
                    <div className={classes.profile_distribution}>
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>Id:</strong> {data.id}</p>
                    </div>
                    <div className={classes.profile_distribution}>
                        <p><strong>Email:</strong> <a style={{textDecoration:'none'}} href={'mailto:'+data.email}>{data.email}</a></p>
                        <p><strong>Phone:</strong> <a style={{textDecoration:'none'}} href={'tel:'+data.phone}>{data.phone}</a></p>
                    </div>
                    <div className={classes.profile_distribution}>
                        <p><strong>Premium:</strong> {data.premium}</p>
                    </div>
                </Card>
                <h3>Bid Details</h3>
                <div className={classes.profile_distribution}>
                    {data.bids.length === 0 ? <p>No Bid available for the customer!</p> :
                        data.bids.map(bid => {
                            return <Card key={bid.id}>
                                <p><strong>Id:</strong> {bid.id}</p>
                                <p><strong>Car Title:</strong> {bid.carTitle}</p>
                                <p><strong>Created:</strong> {new Date(Number(bid.created)).toDateString()}</p>
                                <p><strong>Amount:</strong> {bid.amount}</p>
                            </Card>
                        })}
                </div>
            </div>
            
        </Fragment>
    )
}

export default CustomerDetail;