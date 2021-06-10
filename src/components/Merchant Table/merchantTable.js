import { useEffect } from 'react';
import axios from 'axios';

const MerchantTable = () => {

    useEffect(() => {
        axios.get('https://intense-tor-76305.herokuapp.com/merchants').then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    
    return <div></div>
}

export default MerchantTable;
