import React, { Fragment } from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps{
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity;
    editMode: boolean;
    setEditMode: (editModel: boolean) => void;
    setSelectedActivity: (activity: IActivity) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}

const ActivityDashboard: React.FC<IProps> = ({ 
    activities, 
    selectActivity, 
    selectedActivity, 
    editMode, 
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity
}) => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList activities={activities} selectActivity={selectActivity} />
                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedActivity.id !== undefined && !editMode && (
                        <ActivityDetails 
                        activity={selectedActivity} 
                        setEditMode={setEditMode} 
                        setSelectedActivity={setSelectedActivity}
                        />
                    )}
                    {editMode &&
                        <ActivityForm setEditMode={setEditMode} activity={selectedActivity} 
                            createActivity={createActivity} editActivity={editActivity} />}
                </Grid.Column>
            </Grid>
        </Fragment>
    );
}
export default ActivityDashboard;

