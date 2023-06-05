import { Activity } from '@/app/@types/Activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface ActivityListProps {
  activities: Activity[];
  selectSelectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

function ActivityList({
  activities,
  selectSelectActivity,
  deleteActivity,
}: ActivityListProps) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity: Activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.dateTime.toString()}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => selectSelectActivity(activity.id)}></Button>
                <Label basic content={activity.category}></Label>

                <Button
                  onClick={() => deleteActivity(activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"></Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

export default ActivityList;
