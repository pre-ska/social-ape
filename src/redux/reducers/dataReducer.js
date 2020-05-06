import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        loading: false,
        screams: action.payload
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;

      if (state.scream.screamId === action.payload.screamId) {
        let temp = state.scream.comments;
        state.scream = action.payload;
        state.scream.comments = temp;
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      let ind = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(ind, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case SUBMIT_COMMENT:
      // da bi ubacio novi komentar na vrh
      // vratim objekt u kojem spreadam postojeći state.
      // i nakon toga ubacim promjene koje imam
      // a te promjene su u u scream.comments...dodajem novi komentar na vrh
      // ali za promjenu dijela tog objekta, moram uvijek spredati postojeću vrijednost
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
