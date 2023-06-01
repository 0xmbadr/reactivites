'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home() {
  const [activities, setactivities] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5253/activities')
      .then((res) => {
        console.log(res.data);
        setactivities(res.data);
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
