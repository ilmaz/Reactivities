import React, { useContext, useEffect } from 'react'
import {Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { ActivityDetailInfo } from './ActivityDetailInfo';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailSidebar from './ActivityDetailSidebar';
import ActivityDetailHeader from './ActivityDetailHeader';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const { selectedActivity: activity,
        loadActivity, loadingInitial } = rootStore.activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id, history])

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
                <ActivityDetailSidebar attendees={activity.userActivities} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
