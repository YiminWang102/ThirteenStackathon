const SET_NICKNAME = 'SET_NICKNAME';
const SET_SOCKETID = 'SET_SOCKETID';

const defaultState = {
  nickname: '',
  room: {}
};

export const setNickname = nickname => ({ type: SET_NICKNAME, nickname });
export const setSocketId = id => ({ type: SET_SOCKETID, id });
export const setPlayer = player => dispatch => {
  dispatch(setNickname(player.nickname));
};

// export const setUsername = nickname => dispatch => {
//   dispatch(getUsername(nickname));
// };

export default function (state = defaultState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_NICKNAME:
      return Object.assign(newState, {nickname: action.nickname});
    case SET_SOCKETID:
      return Object.assign(newState, {socketId: action.id});
    default:
      return state;
  }
}
