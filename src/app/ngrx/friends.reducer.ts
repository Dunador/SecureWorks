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
    on(ADD_FRIEND, (state, { friend }) =>  { 
        return {
            ...state,
            editMode: false,
            friends: [...state.friends, { ...friend, friendId: uuid.v4()}]
        }
    }),
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
    on(SELECT_FRIEND_TO_EDIT, (state, { friend }) => {
        return {
            ...state,
            friendToEdit: friend,
            editMode: true,
        }
    })
);