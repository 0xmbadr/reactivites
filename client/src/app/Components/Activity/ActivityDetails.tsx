import { Activity } from '@/app/@types/Activity';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';

interface ActivityDetailsProps {
  activity: Activity;
  cancelSelectActivity: () => void;
}

function ActivityDetails({
  activity,
  cancelSelectActivity,
}: ActivityDetailsProps) {
  return (
    <Card fluid>
      <Image
        src={`/categoryImages/${activity.category}.jpg`}
        alt={`${activity.category} image`}
      />
      <Card.Content>
        <Card.Header>{activity.category}</Card.Header>
        <Card.Meta>
          <span>{activity.dateTime.toString()}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths="2">
          <Button basic color="blue" content="Edit"></Button>
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => cancelSelectActivity()}></Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
}

export default ActivityDetails;
