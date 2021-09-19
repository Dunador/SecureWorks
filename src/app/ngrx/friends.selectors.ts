import { createSelector } from "@ngrx/store"
import { Friend } from "../models/friend";
import { AppState } from "./app.state";
import { FriendState } from "./friends.reducer"

export const selectFriends = createSelector((state: AppState) => state.friends, (friends: Friend[]) => friends);