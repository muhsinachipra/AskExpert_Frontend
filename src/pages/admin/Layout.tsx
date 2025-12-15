// frontend\src\pages\admin\Layout.tsx

import { Outlet } from 'react-router-dom';
import Header from '../../components/admin/Header';
import HeaderMobile from '../../components/admin/HeaderMobile';
import MarginWidthWrapper from '../../components/admin/MarginWidthWrapper';
import PageWrapper from '../../components/admin/PageWrapper';
import SideNav from '../../components/admin/SideNav';

const RootLayout = () => {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>
            <Outlet />
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default RootLayout;
