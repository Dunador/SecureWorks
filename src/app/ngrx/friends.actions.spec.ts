import { Friend } from '../models/friend';
import * as Actions from './friends.actions';

describe('Store > Friends > FriendsActions', () => {
  it('SHOULD create a ADD_FRIEND action with a friend for adding', () => {
    const payload: Friend = {
        firstName: 'Steven', 
        lastName: 'Lewis',
        age: 31,
        weight: 350,
        associatedFriends:[]
    };
    const action = Actions.ADD_FRIEND({friend: payload});
    expect(action.friend).toEqual(payload);
  });

  it('SHOULD create a EDIT_FRIEND action with a friend for editing', () => {
    const payload: Friend = {
        firstName: 'Steven', 
        lastName: 'Lewis',
        age: 31,
        weight: 350,
        associatedFriends:[]
    };
    const action = Actions.EDIT_FRIEND({friend: payload});
    expect(action.friend).toEqual(payload);
  });

  it('SHOULD create a SELECT_FRIEND_TO_EDIT action with a friend for editing', () => {
    const payload: Friend = {
        firstName: 'Steven', 
        lastName: 'Lewis',
        age: 31,
        weight: 350,
        associatedFriends:[]
    };
    const action = Actions.SELECT_FRIEND_TO_EDIT({friend: payload});
    expect(action.friend).toEqual(payload);
  });
});