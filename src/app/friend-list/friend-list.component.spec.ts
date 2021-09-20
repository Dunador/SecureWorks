import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { friendReducer } from '../ngrx/friends.reducer';

import { FriendListComponent } from './friend-list.component';

describe('FriendListComponent', () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendListComponent ],
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ friendState: friendReducer}),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
