import { SnackbarProvider } from 'notistack';
import { Provider, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import Dashboard from './components/layouts/Dashboard';
import FulfillmentDashboard from './components/layouts/fulfillment/FulfillmentDashboard';
import FulfillmentOrderDetails from './components/layouts/fulfillment/OrderDetails';
import OrderList from './components/layouts/fulfillment/OrderList';
import GenerateASN from './components/layouts/GenerateASN';
import OrderDetails from './components/layouts/OrderDetails';
import OrderLists from './components/layouts/OrderLists';
import FulfillmentLogin from './components/login/fulfillment/FulfillmentLogin';
import Login from './components/login/Login';
import VerifyOtp from './components/login/VerifyOTP';
import store, { persistor } from './store';
import { RootState } from './store/reducers';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <AppRoutes />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

const AuthRoute = () => {
  const state = useSelector((state: RootState) => state);
  const {
    fulfillmentAuth: { token: fulfillmentToken },
    auth: { token: supplierToken },
  } = state;

  if (supplierToken) return <Navigate to={'/app'} state={{ next: location.pathname }} />;
  if (fulfillmentToken)
    return <Navigate to={'/fulfillment'} state={{ next: location.pathname }} />;

  return <Outlet />;
};

// Flow-Graph: https://stately.ai/registry/editor/b9d23811-97ba-4645-9c6b-ca5eac51a045?machineId=f0d407e0-1ac1-4c4b-8c3a-cf58c9c81008

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Navigate to={'/auth'} state={{ next: location.pathname }} />}
          />
          <Route path="auth" element={<AuthRoute />}>
            <Route
              index
              element={
                <Navigate to={'/auth/supplier'} state={{ next: location.pathname }} />
              }
            />
            <Route path="supplier">
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="verify-otp" element={<VerifyOtp />} />
            </Route>
            <Route path="fulfillment">
              <Route index element={<FulfillmentLogin />} />
              <Route path="login" element={<FulfillmentLogin />} />
            </Route>
          </Route>
          <Route path="app" element={<Dashboard />}>
            <Route index element={<Navigate to="order-list" replace />} />
            <Route path="order-list" element={<OrderLists />} />
            <Route path="order-details/:id" element={<OrderDetails />} />
            <Route path="order-generate-asn/:id" element={<GenerateASN />} />
          </Route>
          <Route path="fulfillment" element={<FulfillmentDashboard />}>
            <Route index element={<Navigate to="orders" replace />} />
            <Route path="order-details/:id" element={<FulfillmentOrderDetails />} />
            <Route path="orders" element={<OrderList portal={'fulfillment'} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
