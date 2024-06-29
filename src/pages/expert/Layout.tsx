// frontend\src\pages\expert\Layout.tsx

import { Outlet } from 'react-router-dom';
import Header from '../../components/expert/Header';
import HeaderMobile from '../../components/expert/HeaderMobile';
import MarginWidthWrapper from '../../components/expert/MarginWidthWrapper';
import PageWrapper from '../../components/expert/PageWrapper';
import SideNav from '../../components/expert/SideNav';

const ExpertLayout = () => {
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

export default ExpertLayout;
