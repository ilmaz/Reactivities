import React, { useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps{
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
    
    const handleInputChange = (event: any) => { 
        setActivity({ ...activity, title: event.target.value });
    }

    return (
        <Segment clearing>
            <Form>
                <Form.Input onChange={handleInputChange} placeholder='Title' value={activity.title} />
                <Form.TextArea rows={2} placeholder='Description' value={activity.description}/>
                <Form.Input placeholder='Category' value={activity.category}/>
                <Form.Input type='date' placeholder='Date' value={activity.date}/>
                <Form.Input placeholder='City' value={activity.city}/>
                <Form.Input placeholder='Venue' value={activity.venue} />
                <Button floated='right' positive type='submit'content='Submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}
export default ActivityForm
