import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNEST_AUTH_USER: 'UNSET_AUTH_USER',
};

export function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNEST_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export function asyncSetAuthUser({ id, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ id, password });
      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
    dispatch(hideLoading());
  };
}