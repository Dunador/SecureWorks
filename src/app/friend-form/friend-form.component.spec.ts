import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { FriendFormComponent } from './friend-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { friendReducer } from '../ngrx/friends.reducer';
import { Friend } from '../models/friend';

import * as fromActions from '../ngrx/friends.actions';
import * as fromReducer from '../ngrx/friends.reducer';

describe('FriendFormComponent', () => {
  let component: FriendFormComponent;
  let fixture: ComponentFixture<FriendFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendFormComponent ],
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render form with title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Add New Friend');
  });

  it('Should change title when editing friend', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const app = fixture.componentInstance;
    app.editMode = true;
    fixture.detectChanges();
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Update Friend');
  });
});
