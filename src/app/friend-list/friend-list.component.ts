import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { AppState } from '../ngrx/app.state';
import { FriendState } from '../ngrx/friends.reducer';
import { selectFriends } from '../ngrx/friends.selectors';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {

  @ViewChild(MatTable)
  table!: MatTable<any>;
  friends$: Observable<Friend[]>;
  displayedColumns = ['friendId', 'firstName', 'lastName', 'age', 'weight'];
  dataSource = new MatTableDataSource<Friend>();

  constructor(private store: Store<AppState>, private changeDetector: ChangeDetectorRef) { 
    this.friends$ = this.store.pipe(select(selectFriends));
  }
}
