
export const UPDATE_NOTIFICATION_COUNT = "UPDATE_NOTIFICATION_COUNT";
export const RESET_NOTIFICATION_COUNT = "RESET_NOTIFICATION_COUNT";

// Initial state for notifications
const initialNotificationState = {
  notificationCount:0,
};

// Reducer for notification count
const notificationReducer = (state = initialNotificationState, action) => {
  // console.log(state,"heloo------------------ I AM R{URGNAERGKERNGKERNGNKERKN")
  switch (action.type) {
    case UPDATE_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: state.notificationCount + 1, 
      };

    case RESET_NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: 0, 
      };

    default:
      return state;
  }
};

export default notificationReducer;

// Action creators
export const updateNotificationCount = () => ({
  type: UPDATE_NOTIFICATION_COUNT,
});

export const resetNotificationCount = () => ({
  type: RESET_NOTIFICATION_COUNT,
});
