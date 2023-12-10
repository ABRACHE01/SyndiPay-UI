export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentUserId = (state) => state.auth.user?.id;

export const selectIsLoggedIn = (state) => !!state.auth.user;
