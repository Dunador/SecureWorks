import { createAction, props } from '@ngrx/store';
import { Friend } from '../models/friend';

export const ADD_FRIEND = createAction('[Friend Form] Add Friend', props<{friend: Friend}>());
export const EDIT_FRIEND = createAction('[Friend Form] Edit Friend', props<{friend: Friend}>());
export const SELECT_FRIEND_TO_EDIT = createAction('[Friend List] Selected Friend to Edit', props<{friend: Friend}>());