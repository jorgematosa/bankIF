import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {

    public token: string;

  private readonly user_property = 'current_user';

    /**
     * Sets the user token to be appended to http headers if it exists in storage.
     */
    constructor() {
        // set token if saved in local storage
        try {
            const currentUser = JSON.parse(localStorage.getItem(this.user_property));
            this.token = currentUser && currentUser.token;
        } catch (e) {
            alert('Please login again');
        }
    }

    /**
     * Gets the user token from the browsers local storage.
     * @returns string the corresponding token
     */
    public getToken(): string {
        const user = JSON.parse(localStorage.getItem(this.user_property));
        return user.token;
    }

    /**
     * Removes the token from the browsers' localStorage and redirects the user out of the application
     */
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem(this.user_property);
        // window.location.href = environment.authentication_url;
    }
}
