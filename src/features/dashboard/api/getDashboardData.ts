import { api } from '@/api/client';
import type { DashboardData } from '../types';

export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await api.get('/dashboard');
  return response.data.data;
};
