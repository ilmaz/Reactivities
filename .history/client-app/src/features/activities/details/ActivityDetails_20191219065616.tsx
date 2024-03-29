import React, { useContext, useEffect } from 'react'
import { Card, Image, Button, Grid, GridColumn } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { ActivityDetailHeader } from './ActivityDetailHeader';
import { ActivityDetailInfo } from './ActivityDetailInfo';
import { ActivityDetailChat } from './ActivityDetailChat';
import { ActivityDetailSidebar } from './ActivityDetailSidebar';

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
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id])

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity...' />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader />
                <ActivityDetailInfo />
                <ActivityDetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSidebar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
