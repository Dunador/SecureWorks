import { TestBed } from '@angular/core/testing';
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
import { AppComponent } from './app.component';
import { FriendChartComponent } from './friend-chart/friend-chart.component';
import { FriendFormComponent } from './friend-form/friend-form.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { friendReducer } from './ngrx/friends.reducer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FriendFormComponent,
        FriendListComponent,
        FriendChartComponent,
      ],
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
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SecureWorks'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SecureWorks');
  });
});
