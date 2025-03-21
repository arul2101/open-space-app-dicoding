import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from './../../utils/api';
import { setAuthUserActionCreator } from './../authUser/action';

export const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

export function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

export function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // preload process
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

