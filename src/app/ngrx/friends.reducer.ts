import { Action, createReducer, on } from '@ngrx/store';
import { ADD_FRIEND, EDIT_FRIEND, SELECT_FRIEND_TO_EDIT } from './friends.actions';
import { Friend } from '../models/friend';
import * as uuid from 'uuid';

export interface FriendState {
    friends: Friend[],
    editMode: boolean,
    friendToEdit: Friend,
}

export const initialState: FriendState = {
    friends: [],
    editMode: false,
    friendToEdit: {
        firstName: '',
        lastName: '',
        age: 0,
        weight: 0,
        associatedFriends: [],
    }
};

export const friendReducer = createReducer(
    initialState,
    // Add new friend, and generate a unique ID for it.  I chose UUIDs for this.
    on(ADD_FRIEND, (state, { friend }) =>  { 
        return {
            ...state,
            editMode: false,
            friends: [...state.friends, { ...friend, friendId: uuid.v4()}]
        }
    }),
    // On Successful edit action, reset our friendToEdit back to a blank canvas.
    on(EDIT_FRIEND, (state, { friend }) => {
        return {
            friends: [...(state.friends.filter((existingFriend) => existingFriend.friendId !== friend.friendId)), friend],
            editMode: false,
            friendToEdit: {
                firstName: '',
                lastName: '',
                age: 0,
                weight: 0,
                associatedFriends: [],
            }
        };
    }),
    // From the FriendListComponent, this indicates we are ready to edit the chosen friend.
    on(SELECT_FRIEND_TO_EDIT, (state, { friend }) => {
        return {
            ...state,
            friendToEdit: friend,
            editMode: true,
        }
    })
);