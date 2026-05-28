/** Filter params accepted by the backend UserFilter class */
export interface UserFilters {
  name?: string;
  email?: string;
  role?: 'admin' | 'hr';
  start_date?: string;
  end_date?: string;
}
