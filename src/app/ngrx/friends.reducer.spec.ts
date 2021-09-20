
import * as fromReducer from './friends.reducer';
import * as fromActions from './friends.actions';
import { Friend } from '../models/friend';

describe('Store > Data > FriendsReducer', () => {
    let initialState: fromReducer.FriendState;
  beforeEach(() => {
    initialState = {
        friends: [],
        editMode: false,
        friendToEdit: {
            firstName: '',
            lastName: '',
            age: 0,
            weight: 0,
            associatedFriends: [],
        }
    }
  });

  it('should return the default state', () => {
    const state = fromReducer.friendReducer(undefined, { type: null });

    expect(state).toEqual(initialState);
  });

  it('should add friend', () => {
    const payload: Friend = {
      firstName: 'Steven',
      lastName: 'Lewis',
      age: 31,
      weight: 350,
      associatedFriends: []
    };
    const action = fromActions.ADD_FRIEND({friend: payload});
    const state = fromReducer.friendReducer(initialState, action);

    payload.friendId = state.friends[0].friendId;

    expect(state.friends).toEqual([payload]);
  });

  it('should edit friend', () => {
    let payload: Friend = {
        firstName: 'Steven',
        lastName: 'Lewis',
        age: 31,
        weight: 350,
        associatedFriends: []
      };

      const action = fromActions.ADD_FRIEND({friend: payload});
      const state = fromReducer.friendReducer(initialState, action);

      payload.weight = 300;
      payload.friendId = state.friends[0].friendId;

      const editAction = fromActions.EDIT_FRIEND({friend: payload});
      const editState = fromReducer.friendReducer(state, editAction);

      expect(editState.friends).toEqual([payload]);
  })
});