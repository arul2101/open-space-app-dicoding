import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from './../../utils/api';

export const ActionType = {
  RECEIVE_TALK_DETAIL: 'RECEIVE_TALK_DETAIL',
  CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
  TOGGLE_LIKE_TALK_DETAIL: 'TOGGLE_LIKE_TALK_DETAIL',
};

export function receiveTalkDetailActionCreator(talkDetail) {
  return {
    type: ActionType.RECEIVE_TALK_DETAIL,
    payload: {
      talkDetail,
    },
  };
}

export function clearTalkDetailActionCreator() {
  return {
    type: ActionType.CLEAR_TALK_DETAIL,
  };
}

export function toggleLikeTalkDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_LIKE_TALK_DETAIL,
    payload: {
      userId,
    },
  };
}

export function asyncReceiveTalkDetail(talkId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearTalkDetailActionCreator());
    try {
      const talkDetail = await api.getTalkDetail(talkId);
      dispatch(receiveTalkDetailActionCreator(talkDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncToogleLikeTalkDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, talkDetail } = getState();
    dispatch(toggleLikeTalkDetailActionCreator(authUser.id));

    try {
      await api.toggleLikeTalk(talkDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}