import { Trends } from './trends.interface';

export interface DashboardData {
  unresolved: number;
  overdue: number;
  open: number;
  onHold: number;
  trends: Trends;
}