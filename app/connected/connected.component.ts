import { Component } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
@Component({
    moduleId: module.id,
    selector: 'connected',
    templateUrl: 'connected.component.html',
    styleUrls:['connected.component.css']
})

export class ConnectedComponent {
     currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
 }