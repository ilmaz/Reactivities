import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as Finalform, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import { TextAreaInput } from '../../../app/common/form/TextAreaInput';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import { DateInput } from '../../../app/common/form/DateInput';


interface DetailParams {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity,
        editActivity,
        submitting,
        selectedActivity: initializeFromState,
        loadActivity,
        clearActivity } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(
                () => initializeFromState && setActivity(initializeFromState));
        }
        return () => {
            clearActivity()
        }
    }, [loadActivity, clearActivity, match.params.id, initializeFromState, activity.id.length])

    const handleFinalFormSubmit = (values: any) => {
        console.log(values);
    }

    // const handleSubmit = () => {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         }
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     } else {
    //         editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <Finalform onSubmit={handleFinalFormSubmit} render={({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field component={TextInput as any} name='title' placeholder='Title' value={activity!.title} />
                            <Field component={TextAreaInput as any} rows={3} name='description' placeholder='Description' value={activity.description} />
                            <Field component={SelectInput as any} options={category} name='category' placeholder='Category' value={activity.category} />
                            <Form.Group widths='equal'>
                                <Field component={DateInput as any} name='date' date={true} placeholder='Date' value={activity.date!} />
                                <Field component={DateInput as any} name='time' time={true} placeholder='Time' value={activity.date!} />
                            </Form.Group>
                            <Field component={TextInput as any} name='city' placeholder='City' value={activity.city} />
                            <Field component={TextInput as any} name='venue' placeholder='Venue' value={activity.venue} />
                            <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                            <Button onClick={() => history.push('/activities')} floated='right' type='submit' content='Cancel' />
                        </Form>
                    )} />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}
export default observer(ActivityForm);
