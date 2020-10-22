import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuid } from "uuid";

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT, //dispatch the type of SET_ALERT to the reducer alert.js
    payload: { msg, alertType, id },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
};
