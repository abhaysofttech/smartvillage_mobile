import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, GramPanchayat } from '../_models';
import { SERVER_URL } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${SERVER_URL}/users`);
    }

    register(user: User) {
        debugger
     //   console.log(SERVER_URL);
     //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/users/register`, user);
    }
    updateGramPanchayat(id:string,gramPanchayat: GramPanchayat){
        debugger
        return this.http.put(`${SERVER_URL}/users/update/${id}`, gramPanchayat);

    }

    delete(id: number) {
        return this.http.delete(`${SERVER_URL}/users/${id}`);
    }

}