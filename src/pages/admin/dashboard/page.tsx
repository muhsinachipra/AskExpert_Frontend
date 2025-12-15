// frontend/src/pages/admin/dashboard/page.tsx

import { Icon } from '@iconify/react';
import { useDashboardDataQuery, useExpertsByCategoryDataQuery, useUserCountFilterQuery } from '../../../slices/api/adminApiSlice';
import DashboardStats from '../../../components/admin/dashboard/DashboardStats';
import DoughnutChart from '../../../components/admin/dashboard/DoughnutChart';
import BarChart from '../../../components/admin/dashboard/BarChart';

export default function Dashboard() {
  const { data, refetch } = useDashboardDataQuery();
  const stats = data?.response;
  const { data: expertsByCategoryData, refetch: refetchExperts } = useExpertsByCategoryDataQuery();
  const { data: userCountData, refetch: refetchUser } = useUserCountFilterQuery();

  const statsData = [
    { title: "Total Users", value: stats?.userData.totalUsers.toString() || '0', icon: <Icon icon="ph:users" width="30" height="30" />, description: `Active Users: ${stats?.userData.totalUsers}` },
    { title: "Total Experts", value: stats?.expertData.totalExperts.toString() || '0', icon: <Icon icon="grommet-icons:user-expert" width="30" height="30" />, description: `Verified Expert: ${stats?.expertData.verifiedExperts}` },
    { title: "Total Appointments", value: stats?.appointmentData.totalAppointments.toString() || '0', icon: <Icon icon="icon-park-outline:appointment" width="30" height="30" />, description: `Completed Appointments: ${stats?.appointmentData.completedAppointments}` },
    { title: "Total Reports", value: stats?.reportData.totalReports.toString() || '0', icon: <Icon icon="material-symbols:report-outline" width="30" height="30" />, description: `Blocked Expert: ${stats?.expertData.blockedExperts}` },
  ]

  return (
    <div className="p-2">

      <div className="flex justify-end mb-3">
        <button
          onClick={() => {
            refetch();
            refetchExperts();
            refetchUser();
          }}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md 
             hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 ease-in-out
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
             transform active:scale-95"
        >
          <Icon icon="material-symbols-light:refresh" width="20" height="20" className="mr-2" />
          Refresh Data
        </button>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => (
          <DashboardStats key={k} {...d} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <BarChart data={userCountData?.response.data || { yearlyData: [], monthlyData: [], weeklyData: [] }} />
        <DoughnutChart data={expertsByCategoryData?.response.data || []} />
      </div>
    </div>
  );
}