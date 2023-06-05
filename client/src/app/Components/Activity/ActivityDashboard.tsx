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
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}
function ActivityDashboard({
  activities,
  cancelSelectActivity,
  selectSelectActivity,
  selectedActivity,
  editMode,
  closeForm,
  openForm,
  createOrEdit,
  deleteActivity,
}: ActivityDashboardProps) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectSelectActivity={selectSelectActivity}
          deleteActivity={deleteActivity}></ActivityList>
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
            activity={selectedActivity}
            createOrEdit={createOrEdit}></ActivityForm>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default ActivityDashboard;
