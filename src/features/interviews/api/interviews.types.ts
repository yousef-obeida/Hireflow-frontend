/** Filter params accepted by the backend InterviewFilter class */
export interface InterviewFilters {
  status?: 'scheduled' | 'completed' | 'cancelled';
  interviewer?: string;
  start_date?: string;
  end_date?: string;
}
