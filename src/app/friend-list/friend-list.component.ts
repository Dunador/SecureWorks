import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { AppState } from '../ngrx/app.state';
import { SELECT_FRIEND_TO_EDIT } from '../ngrx/friends.actions';
import { FriendState } from '../ngrx/friends.reducer';
import { selectFriendState } from '../ngrx/friends.selectors';

// This component is simply a Material table that contained a clickable icon, that will allow for editting a friend.
// It displays all basic information about a friend, sans associated friends for potential screen space reasons.
@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>;
  friendState$: Observable<FriendState>;
  displayedColumns = ['edit', 'firstName', 'lastName', 'age', 'weight'];
  dataSource = new MatTableDataSource<Friend>();

  constructor(private store: Store<AppState>, private changeDetector: ChangeDetectorRef) { 
    this.friendState$ = this.store.pipe(select(selectFriendState));
  }

  ngOnInit() {
    this.friendState$.subscribe((friendState: any) => {
      if (friendState && friendState.friends) {
        this.dataSource.data = friendState.friends;
      }
    })
  }

  editFriend(friend: Friend) {
    this.store.dispatch(SELECT_FRIEND_TO_EDIT({ friend: friend }));
  }
}
