import { Component } from '@angular/core';
import { Friend } from './models/friend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SecureWorks';
  friendToEdit: Friend = {
    firstName: '',
    lastName: '',
    age: 0,
    weight: 0,
    associatedFriends: [],
  }
  editMode = false;

  onEditFriend(friend: Friend) {
    this.friendToEdit = friend;
    
  }
}
