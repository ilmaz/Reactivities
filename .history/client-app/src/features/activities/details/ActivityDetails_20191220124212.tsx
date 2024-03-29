import React, { useContext, useEffect } from 'react'
import {Grid } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { ActivityDetailInfo } from './ActivityDetailInfo';
import { ActivityDetailChat } from './ActivityDetailChat';
import { ActivityDetailSidebar } from './ActivityDetailSidebar';
import ActivityDetailHeader from './ActivityDetailHeader';

interface DetailParams {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const activityStore = useContext(ActivityStore);
    const { selectedActivity: activity,
        loadActivity, loadingInitial } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id).catch(()=>{
            history.push('/notfound');
        })
    }, [loadActivity, match.params.id])

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    if(!activity)
        return <h2>Activity not found</h2>
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity} />
                <ActivityDetailInfo activity={activity} />
                <ActivityDetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSidebar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
