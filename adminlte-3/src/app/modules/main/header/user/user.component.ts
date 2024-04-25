import {Component, OnInit} from '@angular/core';
import { ApiService } from '@services/api.service';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor(private auth:AuthService) {}

    ngOnInit(): void {
        this.user = this.auth.getUser();
    }

    logout() {
        this.auth.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
