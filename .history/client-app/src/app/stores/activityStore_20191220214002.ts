import { observable, action, computed, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

class ActivityStore{
    @observable activityRegistery = new Map();
    @observable selectedActivity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    //ijad khoroji jadid
    @computed get activitiesByDate(){
        return this.groupActivitiesByDate(Array.from(this.activityRegistery.values()))
    }

    groupActivitiesByDate(activities: IActivity[]) { 
        const sortedActivities = activities.sort(
            (a, b) => a.date!.getDate() - b.date!.getDate()
        )
        return Object.entries(sortedActivities.reduce((activities,activity)=>{
            const date = activity.date!.toISOString().split('T')[0];
            activities[date]=activities[date]? [...activities[date],activity]:[activity];
            return activities;
        }, {} as { [key: string]: IActivity[] }));
    }

    //bussines
    @action loadingActivity = async () => { 
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities',()=>{
                activities.forEach((activity) => { 
                    activity.date = new Date(activity.date!);
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

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
        }else{
            this.loadingInitial=true;
        }try {
            activity = await agent.Activities.details(id);
            runInAction('getting activity', () => {
                this.loadingInitial = false;

            })
        } catch (error) {
            runInAction('getting activity error', () => {
                activity.date = new Date(activity.date);
                this.selectedActivity = activity;
                this.loadingInitial = false;
            })
            console.log(error);
        }
     }

    @action clearActivity = () => {
        this.selectedActivity = null;
     }

    getActivity = (id: string) => this.activityRegistery.get(id)

    @action createActivity =async (activity: IActivity) => {
        this.submitting=true;
        try {
            await agent.Activities.create(activity);
            runInAction('creating activity',() => {
                this.activityRegistery.set(activity.id, activity);
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
}

export default createContext(new ActivityStore())