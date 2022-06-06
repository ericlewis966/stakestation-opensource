import { GET_PROJECT } from 'src/actions/type';
  
  const initialState = {
    project: {}
  };
  
  function stakingReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PROJECT:
        console.log(type);
        return {
          ...state,
          project: payload,
        };
      default:
        return state;
    }
  }
  
  export default stakingReducer;