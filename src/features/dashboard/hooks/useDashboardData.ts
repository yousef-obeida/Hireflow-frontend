import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../api/getDashboardData';

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: getDashboardData,
  });
};
