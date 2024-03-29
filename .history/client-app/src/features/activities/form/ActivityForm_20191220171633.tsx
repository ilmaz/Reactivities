import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as Finalform, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';

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
        date: '',
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

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
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
                            <Field name='title' placeholder='Title' value={activity!.title} component={TextInput as any}/>
                            <Form.TextArea name='description' onChange={handleInputChange} rows={2} placeholder='Description' value={activity.description} />
                            <Form.Input name='category' onChange={handleInputChange} placeholder='Category' value={activity.category} />
                            <Form.Input name='date' onChange={handleInputChange} type='datetime-local' placeholder='Date' value={activity.date} />
                            <Form.Input name='city' onChange={handleInputChange} placeholder='City' value={activity.city} />
                            <Form.Input name='venue' onChange={handleInputChange} placeholder='Venue' value={activity.venue} />
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
