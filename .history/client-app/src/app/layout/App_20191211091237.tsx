import React, { useState, useEffect, Fragment } from 'react';
import '../layout/styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// interface IState{
//   activities: IActivity[]
// }
//add empty object parameter and pass IState 
const App = () => {
  const model = {} as IActivity;
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity>(model);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(model);
    setEditMode(true);
  }

  useEffect(()=>{
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response)=>{
        setActivities(response.data)
      });
  }, []);

    return (
      <Fragment>
        <NavBar openCreateForm={handleOpenCreateForm}/>
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard 
            activities={activities}
            selectActivity={handleSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        </Container>
      </Fragment>
    );
}

export default App;
