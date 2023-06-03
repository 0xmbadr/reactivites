'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Activity } from './@types/Activity';
import NavBar from './Components/NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from './Components/Activity/ActivityDashboard';

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<Boolean>(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
    setEditMode(false);
  };

  const handleOpenActivityForm = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleCloseActivityForm = () => {
    setEditMode(false);
  };

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5253/activities')
      .then((res) => {
        console.log(res.data);
        setActivities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <NavBar handleOpenActivityForm={handleOpenActivityForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectSelectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenActivityForm}
          closeForm={handleCloseActivityForm}></ActivityDashboard>
      </Container>
    </main>
  );
}
