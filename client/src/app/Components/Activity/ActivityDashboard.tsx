import { Activity } from '@/app/@types/Activity';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';

interface ActivityDashboardProps {
  activities: Activity[];
}
function ActivityDashboard({ activities }: ActivityDashboardProps) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities}></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {activities.length ? (
          <ActivityDetails activity={activities[0]}></ActivityDetails>
        ) : (
          ``
        )}
        <ActivityForm></ActivityForm>
      </Grid.Column>
    </Grid>
  );
}

export default ActivityDashboard;
