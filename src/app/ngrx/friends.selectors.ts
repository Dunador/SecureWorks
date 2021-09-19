import { createSelector } from "@ngrx/store"
import { Friend } from "../models/friend";
import { AppState } from "./app.state";
import { FriendState } from "./friends.reducer"

export const selectFriendState = createSelector((state: AppState) => state.friendState, (friendState: FriendState) => friendState);
