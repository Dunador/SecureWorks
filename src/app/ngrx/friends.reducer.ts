import { Action, createReducer, on } from '@ngrx/store';
import { ADD_FRIEND, EDIT_FRIEND } from './friends.actions';
import { Friend } from '../models/friend';
import * as uuid from 'uuid';

export interface FriendState {
    friends: Friend[]
}

export const initialState: Friend[] = [];

export const friendReducer = createReducer(
    initialState,
    on(ADD_FRIEND, (state, { friend }) =>  { 
        return [...state, {...friend, friendId: uuid.v4()}];
    }),
    on(EDIT_FRIEND, (state, { friend }) => {
        const index = state.findIndex((entry) => entry.friendId === friend.friendId);
        state[index] = friend;
        return state;
    })
);