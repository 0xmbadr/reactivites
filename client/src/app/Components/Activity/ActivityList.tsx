import { Activity } from '@/app/@types/Activity';

interface ActivityListProps {
  activities: Activity[];
}

function ActivityList({ activities }: ActivityListProps) {
  return <div>ActivityList</div>;
}

export default ActivityList;
