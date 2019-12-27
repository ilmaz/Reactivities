import { observable } from 'mobx';
import { IUser } from '../models/user';

export default class UserStore { 
    @observable user: IUser | null=null;
}