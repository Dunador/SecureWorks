import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { FriendState } from '../ngrx/friends.reducer';
import { ADD_FRIEND, EDIT_FRIEND } from '../ngrx/friends.actions';
import { selectFriends } from '../ngrx/friends.selectors';
import { SelectOptions } from '../models/select-options';

@Component({
  selector: 'app-friend-form',
  templateUrl: './friend-form.component.html',
  styleUrls: ['./friend-form.component.css']
})
export class FriendFormComponent {
  @Input() friendToEdit?: Friend;
  @Input() editMode: Boolean = false;
  friends$: Observable<Friend[]>;
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
    private store: Store<FriendState>
  ) {
    this.friends$ = this.store.pipe(select(selectFriends));
  }

  ngOnInit() {
    this.friends$.subscribe((friends) => {
      this.friendSelectOptions = friends.map((friend) => {
        return { value: friend.friendId!, displayText: friend.firstName+' '+friend.lastName };
      });
    })
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

    console.log(friendData);

    if (!this.editMode)
      this.store.dispatch(ADD_FRIEND({ friend: friendData }));
    else
      this.store.dispatch(EDIT_FRIEND({ friend: friendData}));

    this.friendForm.reset();
    formDirective.resetForm();
  }
}
