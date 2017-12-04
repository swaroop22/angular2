import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {User} from './user';

@Injectable()
export class UsersService {

  private url: string = "http://localhost:8092/personController";

  constructor(private http: Http) { }

  getUsers(){
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getUser(id){
    return this.http.get(this.getUserUrl(id))
      .map(res => res.json());
  }

  addUser(user: User){
    return this.http.post(this.url, JSON.stringify(user))
      .map(res => res.json());
  }

  updateUser(user: User, id){
    user.id = id;
    return this.http.put( this.getUserUrl(id), JSON.stringify(user))
      .map(res => res.json());
  }

  deleteUser(id){
    return this.http.delete(this.getUserUrl(id))
      .map((response: Response) => {
        return response.json();
      });
  }

  private getUserUrl(id){
    return this.url + "/" + id;
  }
}
