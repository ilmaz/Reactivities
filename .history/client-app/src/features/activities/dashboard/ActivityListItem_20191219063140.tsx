import React from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import ActivityStore from '../../../app/stores/activityStore';
import { IActivity } from '../../../app/models/activity';

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    // const activityStore = useContext(ActivityStore);
    // const { deleteActivity, submitting, target } = activityStore;
    return (
        <Segment.Group>
            <Segment>
                <Item>
                    <Item.Image size='tiny' circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Description>
                            Hosted by bob
                        </Item.Description>
                        <Item.Extra>
                            <Button
                                as={Link} to={`/activities/${activity.id}`}
                                floated="right"
                                content='View'
                                color='blue' />
                            <Label basic content={activity.category} />
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Segment>
            <Segment>
                <Icon name='clock' />{activity.date}
                <Icon name='marker' />{activity.venue}, {activity.city}
            </Segment>
        </Segment.Group>
    )
}
