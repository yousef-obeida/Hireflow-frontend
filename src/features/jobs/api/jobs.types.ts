/** Filter params accepted by the backend JobFilter class */
export interface JobFilters {
  title?: string;
  status?: 'open' | 'closed';
  start_date?: string;
  end_date?: string;
}
