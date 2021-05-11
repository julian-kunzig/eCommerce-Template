import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from './user.service';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.REST_API_SERVER}/accounts/token`, { email, password })
            .pipe(map(user => {
                // store jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('access_token', JSON.stringify(user.access));
                localStorage.setItem('refresh_token', JSON.stringify(user.refresh));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('type');
        this.currentUserSubject.next(null);
    }

    refresh(){
        const refresh = localStorage.getItem('refresh_token');
        return this.http.post<any>(`${environment.REST_API_SERVER}/accounts/token/refresh`, {refresh})
            .pipe(map(user => {
                // store jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('access_token', JSON.stringify(user.access));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
}
