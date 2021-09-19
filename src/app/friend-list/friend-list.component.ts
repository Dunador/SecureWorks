import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { AppState } from '../ngrx/app.state';
import { SELECT_FRIEND_TO_EDIT } from '../ngrx/friends.actions';
import { FriendState } from '../ngrx/friends.reducer';
import { selectFriendState } from '../ngrx/friends.selectors';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {

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
