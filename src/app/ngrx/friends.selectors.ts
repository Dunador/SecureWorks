import { createSelector } from "@ngrx/store"
import { Friend } from "../models/friend";
import { AppState } from "./app.state";
import { FriendState } from "./friends.reducer"

// Only 1 Selector needed, to pull in the current FriendState
export const selectFriendState = createSelector((state: AppState) => state.friendState, (friendState: FriendState) => friendState);
