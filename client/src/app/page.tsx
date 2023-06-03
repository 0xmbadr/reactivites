'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Activity } from './@types/Activity';
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
      <div>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>{activity.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
