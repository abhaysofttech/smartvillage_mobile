import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { States, Division, District, Tehsils, MahaNagarPalika, NagarPalika, NagarPanchayat, GramPanchayat, Ward } from '../_models';
import { SERVER_URL } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminService {
    constructor(private http: HttpClient) { }

    getAllStates() {
        return this.http.get<States[]>(`${SERVER_URL}/state`);
    }

    getAllDivision(statename: string) {
        return this.http.get<Division[]>(`${SERVER_URL}/division/${statename}`);
    }

    getAllDistrict(divisionname: string) {
        return this.http.get<District[]>(`${SERVER_URL}/district/${divisionname}`);
    }
    getAllTehsils(districtname: string) {
        return this.http.get<Tehsils[]>(`${SERVER_URL}/tehsils/${districtname}`);
    }
    getAllGramPanchayat(tehsilsname: string) {
        return this.http.get<GramPanchayat[]>(`${SERVER_URL}/grampanchayat/${tehsilsname}`);
    }
    grampanchayatList

    registerState(state: States) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/state/register`, state);
    }

    registerDivision(division: Division) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/division/register`, division);
    }
    registerDistrict(district: District) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/district/register`, district);
    }
    registerTehsils(tehsils: Tehsils) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/tehsils/register`, tehsils);
    }
    registerMahaNagarPalika(mahaNagarPalika: MahaNagarPalika) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/mahanagarpalika/register`, mahaNagarPalika);
    }
    registerNagarPalika(nagarPalika: NagarPalika) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/nagarpalika/register`, nagarPalika);
    }
    registerNagarPanchayat(nagarPanchayat: NagarPanchayat) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/nagarpanchayat/register`, nagarPanchayat);
    }
    registerGramPanchayat(gramPanchayat: GramPanchayat) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/grampanchayat/register`, gramPanchayat);
    }
    registerWard(ward: Ward) {
        //   console.log(SERVER_URL);
        //   http://localhost:4000/users
        return this.http.post(`${SERVER_URL}/ward/register`, ward);
    }
   
    delete(id: number) {
        return this.http.delete(`${SERVER_URL}/users/${id}`);
    }
}