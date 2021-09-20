import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { friendReducer } from '../ngrx/friends.reducer';

import { FriendChartComponent } from './friend-chart.component';

describe('FriendChartComponent', () => {
  let component: FriendChartComponent;
  let fixture: ComponentFixture<FriendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendChartComponent ],
      imports: [
        StoreModule.forRoot({ friendState: friendReducer}),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
