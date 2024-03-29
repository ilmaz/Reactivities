import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity
}

const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initializeFromState }) => {

    const initializeFrom = () => {
        if (initializeFromState) {
            return initializeFromState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeFrom);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    const handleSubmit = () => { 
        console.log(activity);
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input name='title' onChange={handleInputChange} placeholder='Title' value={activity.title} />
                <Form.TextArea name='description' onChange={handleInputChange} rows={2} placeholder='Description' value={activity.description} />
                <Form.Input name='category' onChange={handleInputChange} placeholder='Category' value={activity.category} />
                <Form.Input name='date' onChange={handleInputChange} type='date' placeholder='Date' value={activity.date} />
                <Form.Input name='city' onChange={handleInputChange} placeholder='City' value={activity.city} />
                <Form.Input name='venue' onChange={handleInputChange} placeholder='Venue' value={activity.venue} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}
export default ActivityForm
