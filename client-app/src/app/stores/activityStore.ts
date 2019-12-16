import { observable, action, computed, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

class ActivityStore{
    @observable activityRegistery = new Map();
    // @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    //ijad khoroji jadid
    @computed get activitiesByDate(){
        return Array.from(this.activityRegistery.values())
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    //bussines
    @action loadingActivity = async () => { 
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities',()=>{
                activities.forEach((activity) => { 
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistery.set(activity.id, activity);
                });
            })
            this.loadingInitial = false;
        }
        catch (error) {
            runInAction('loading activities error',()=>{
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    @action createActivity =async (activity: IActivity) => {
        this.submitting=true;
        try {
            await agent.Activities.create(activity);
            runInAction('creating activity',() => {
                this.activityRegistery.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
           })
        } catch (error) {
            runInAction('creating activity error',() => { 
                this.submitting = false;
            })
            console.log(error);
        }
    }

    @action editActivity = async (activity: IActivity) => { 
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('edit activity', () => { 
                this.activityRegistery.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction('edit activity error', () => { 
                this.submitting = false;
            })
            console.log(error);
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('deleting activity', () => {
                this.activityRegistery.delete(id);
                this.submitting = false;
                this.target = '';
            })
        } catch (error) {
            this.submitting = false;
            this.target = '';
            console.log(error);
        }
     }

    @action openCreateFrom=()=>{
        runInAction('deleting activity error', () => {
            this.editMode = true;
            this.selectedActivity = undefined;
        })
        
    }

    @action openEditFrom = (id: string) => {
        this.editMode = true;
        this.selectedActivity = this.activityRegistery.get(id);
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistery.get(id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())