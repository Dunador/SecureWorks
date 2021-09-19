import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { ADD_FRIEND, EDIT_FRIEND } from '../ngrx/friends.actions';
import { selectFriendState } from '../ngrx/friends.selectors';
import { SelectOptions } from '../models/select-options';
import { AppState } from '../ngrx/app.state';
import { FriendState } from '../ngrx/friends.reducer';

@Component({
  selector: 'app-friend-form',
  templateUrl: './friend-form.component.html',
  styleUrls: ['./friend-form.component.css']
})
export class FriendFormComponent {
  friendToEdit: Friend = { 
    firstName: '',
    lastName: '',
    age: 0,
    weight: 0,
    associatedFriends: []
  };
  editMode: Boolean = false;
  friendState$: Observable<FriendState>;
  selectedAssociates: string[] = [];
  friendSelectOptions: SelectOptions[] = [];

  friendForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    friends: [],
    age: [null, Validators.required], 
    weight: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.friendState$ = this.store.pipe(select(selectFriendState));
  }

  ngOnInit() {
    this.friendState$.subscribe((friendState) => {
      if (friendState) {
        this.editMode = friendState.editMode;
        this.friendToEdit = friendState.friendToEdit;
        let newFriends = friendState.friends;
        if(this.editMode) {
          newFriends = friendState.friends.filter((friend) => friend.friendId !== this.friendToEdit.friendId);
        }
        this.friendSelectOptions = newFriends.map((friend) => {
          return { value: friend.friendId!, displayText: friend.firstName+' '+friend.lastName };
        });
        this.friendForm.get('firstName')?.setValue(this.friendToEdit.firstName);
        this.friendForm.get('lastName')?.setValue(this.friendToEdit.lastName);
        this.friendForm.get('friends')?.setValue(this.friendToEdit.associatedFriends);
        this.friendForm.get('age')?.setValue(this.friendToEdit.age);
        this.friendForm.get('weight')?.setValue(this.friendToEdit.weight);
      }
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    const friendData: Friend = {
      friendId: this.friendToEdit?.friendId,
      firstName: this.friendForm.get('firstName')?.value,
      lastName: this.friendForm.get('lastName')?.value,
      age: this.friendForm.get('age')?.value,
      weight: this.friendForm.get('weight')?.value,
      associatedFriends: this.selectedAssociates || []
    };

    if (
      this.friendForm.get('firstName')?.value === null ||
      this.friendForm.get('lastName')?.value === null ||
      this.friendForm.get('age')?.value === null ||
      this.friendForm.get('weight')?.value === null
    ) {
      alert("Please completely fill out the friend form.  Thank you!");
      return;
    }

    if (!this.editMode)
      this.store.dispatch(ADD_FRIEND({ friend: friendData }));
    else
      this.store.dispatch(EDIT_FRIEND({ friend: friendData}));

    this.friendForm.reset();
    formDirective.resetForm();
  }
}
