import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { complainname, subcomplainname } from '../_models';
import { SERVER_URL } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComplainService {
    constructor(private http: HttpClient) { }

    getcomplainname() {
        return this.http.get<complainname[]>(`${SERVER_URL}/complain`);
    }
    getsubcomplainname(param): Observable<any> {

        // Setup log namespace query parameter
        let params = new HttpParams().set('complainTypes', param);
        return this.http.get<subcomplainname[]>(`${SERVER_URL}/subcomplain/subcomplainname`, { params: params });
    }
    registerComplain(complainname: complainname) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/complain/register`, complainname);
    }

    registerSubComplain(subcomplainname: subcomplainname) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/subcomplain/register`, subcomplainname);
    }
    // register(user: User) {
    //  //   console.log(SERVER_URL);
    //  //   http://localhost:4000/users
    //     return this.http.post(`${SERVER_URL}/users/register`, user);
    // }

}