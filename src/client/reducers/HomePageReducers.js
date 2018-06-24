import { HomePageActionTypes } from '../actions';

const initialState = {
  objectsData: [],
  startIndex: 0,
  endIndex: 2,
  clickedObjectMetaData: null,
  showModal: false,
};

const HomePageReducers = (state = initialState, action) => {
  switch(action.type) {
    case HomePageActionTypes.GET_OBJECT:
    const { objectsData } = state;

      return { 
        ...state, 
        objectsData: [...objectsData, ...action.payload.data], 
        startIndex: action.payload.startIndex, 
        endIndex: action.payload.endIndex 
      };

    case HomePageActionTypes.OBJECT_CLICKED:
      return { ...state, clickedObjectMetaData: action.payload, showModal: true };

    case HomePageActionTypes.CLOSE_MODAL:
      return { ...state, showModal: false, clickedObjectMetaData: null };

    default:
      return state;  
  }
}

export default HomePageReducers;
