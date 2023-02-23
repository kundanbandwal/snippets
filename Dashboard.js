import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from '../../store/reducers';
import { AuthState } from '../login/auth-reducer';
import HeaderLayout from '../login/HeaderLayout';

export const Page = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(180deg, #061019 0%, #132E49 65.43%)',
  minHeight: '100vh',
  width: '100%',
});
export const PageSection = styled(Box)({
  width: '90%',
  height: 'auto',
  margin: '20px auto',
});

export default function Dashboard() {
  const { token: supplierToken } = useSelector<RootState, AuthState>(
    (store: any) => store.auth,
  );
  if (!supplierToken)
    return <Navigate to={'/auth/supplier'} state={{ next: location.pathname }} />;

  return (
    <Page>
      <PageSection>
        <HeaderLayout />
        <Outlet />
      </PageSection>
    </Page>
  );
}
