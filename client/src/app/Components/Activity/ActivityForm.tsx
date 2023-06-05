import { Activity } from '@/app/@types/Activity';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

interface ActivityFormProps {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}

function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
}: ActivityFormProps) {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    description: '',
    category: '',
    dateTime: '',
    city: '',
    venue: '',
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    console.log(activity);

    createOrEdit(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}></Form.Input>
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}></Form.TextArea>
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}></Form.Input>
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.dateTime}
          name="dateTime"
          onChange={handleInputChange}></Form.Input>
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}></Form.Input>
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}></Form.Input>
        <Button
          onClick={handleSubmit}
          floated="right"
          positive
          type="submit"
          content="Submit"></Button>
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => closeForm()}></Button>
      </Form>
    </Segment>
  );
}

export default ActivityForm;
