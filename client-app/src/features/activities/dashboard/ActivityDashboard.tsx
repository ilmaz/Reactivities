import React, { Fragment, useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDashboard: React.FC= () => {
    const activityStore = useContext(ActivityStore);

    useEffect(()=>{
      activityStore.loadingActivity();
    }, [activityStore]);
   
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />
      
    
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList />
                </Grid.Column>
                <Grid.Column width={6}>
                   <h2>Activity filters</h2>
                </Grid.Column>
            </Grid>
        </Fragment>
    );
}
export default observer(ActivityDashboard);

