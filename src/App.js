import MerchantTable from './components/MerchantTable/merchantTable';
import { Route, Switch } from 'react-router-dom';
import React, { Fragment, Suspense } from 'react';

function App() {

  const CustomerDetail = React.lazy(() => import('./components/CustomerDetails/CustomerDetail'));
  const NoPageFound = React.lazy(() => import('./components/NoPageFound/NoPageFound'));

  return (
    <Fragment>
      <Suspense fallback={<div className='centered'>Loading...</div>}>
        <h2 style={{ textAlign: 'center' }}>Customer Details</h2>
        <Switch>
          <Route path='/' exact>
            <MerchantTable />
          </Route>
          <Route path='/customerDetail'>
            <CustomerDetail />
          </Route>
          <Route path='*'>
            <NoPageFound />
          </Route>
        </Switch>
      </Suspense>
    </Fragment>
    
  );
}

export default App;
