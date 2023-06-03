import { Activity } from '@/app/@types/Activity';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';

interface ActivityDashboardProps {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectSelectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: Boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
}
function ActivityDashboard({
  activities,
  cancelSelectActivity,
  selectSelectActivity,
  selectedActivity,
  editMode,
  closeForm,
  openForm,
}: ActivityDashboardProps) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectSelectActivity={selectSelectActivity}></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode ? (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}></ActivityDetails>
        ) : (
          ``
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}></ActivityForm>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default ActivityDashboard;
