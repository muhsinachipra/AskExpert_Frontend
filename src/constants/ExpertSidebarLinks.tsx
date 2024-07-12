// frontend\src\constants\ExpertSidebarLinks.tsx

import { Icon } from '@iconify/react';

import { SideNavItem } from '../types/sideNavItem';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/expert/home',
    icon: <Icon icon="akar-icons:home" width="24" height="24" />,
  },
  {
    title: 'Appointments',
    path: '/expert/appointments',
    icon: <Icon icon="teenyicons:appointments-outline" width="24" height="24" />,
  },
  {
    title: 'Schedule',
    path: '/expert/schedule',
    icon: <Icon icon="akar-icons:schedule" width="24" height="24" />,
  },
  {
    title: 'Profile',
    path: '/expert/profile',
    icon: <Icon icon="gg:profile" width="24" height="24" />,
  },
  // {
    //   title: 'Expert',
  //   path: '/expert/experts',
  //   icon: <Icon icon="carbon:user-expert" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'All', path: '/expert/all-experts' },
  //     { title: 'Verify experts', path: '/expert/verify-experts' },
  //     // { title: 'Graphic Design', path: '/expert/' },
  //   ],
  // },
  // // {
  // //   title: 'User',
  // //   path: '/expert/users',
  // //   icon: <Icon icon="lucide:user" width="24" height="24" />,
  // //   submenu: true,
  // //   subMenuItems: [
  // //     { title: 'All', path: '/expert/all-users' },
  // //     { title: 'user-2', path: '/expert/projects/user-2' },
  // //     // { title: 'Graphic Design', path: '/expert/projects/graphic-design' },
  // //   ],
  // // },
  // {
  //   title: 'User',
  //   path: '/expert/users',
  //   icon: <Icon icon="lucide:user" width="24" height="24" />,
  // },
  // {
  //   title: 'Category',
  //   path: '/expert/category',
  //   icon: <Icon icon="material-symbols:category-outline" width="24" height="24" />,
  // },
  // // {
  // //   title: 'Settings',
  // //   path: '/expert/settings',
  // //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  // //   submenu: true,
  // //   subMenuItems: [
    // //     { title: 'Account', path: '/expert/settings/account' },
    // //     { title: 'Privacy', path: '/expert/settings/privacy' },
    // //   ],
    // // },
    // // {
      // //   title: 'Help',
      // //   path: '/expert/help',
      // //   icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
      // // },
      // {
        //   title: 'Logout',
        //   path: '/expert/logout',
        //   icon: <Icon icon="material-symbols:logout" width="24" height="24" />,
        // },
        // {
        //   title: 'Wallet',
        //   path: '/expert/wallet',
        //   icon: <Icon icon="simple-line-icons:wallet" width="24" height="24" />,
        // },
      ];
      