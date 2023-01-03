export default function reducer(state, action) {
  switch (action.type) {
    case 'Toggle_Dark_Mode':{
      const mode = action.payload ? 'dark' : 'light';
      //do stuff
      return { ...state, darkMode: action.payload };
    }
    case 'SET_USERNAME': {
      return { ...state, username: action.payload };
    }
    default: return state;
  }
}