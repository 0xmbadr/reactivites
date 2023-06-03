'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Activity } from './@types/Activity';
import NavBar from './Components/NavBar';
import { Container, ListItem } from 'semantic-ui-react';

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);

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
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ul>
          {activities.map((activity) => (
            <ListItem key={activity.id}>{activity.title}</ListItem>
          ))}
        </ul>
      </Container>
    </main>
  );
}
