import { HomePageService } from '../services';

const HomePageActionTypes = {
  GET_OBJECT: 'HomePage/GET_OBJECTS',
  OBJECT_CLICKED: 'HomePage/OBJECT_CLICKED',
  CLOSE_MODAL: 'HomePage/CLOSE_MODAL',
};

const HomePageActions = {
  getObjects: (startIndex = 0, endIndex = 2) => (dispatch) => {
    HomePageService.getHomePageObjects(startIndex, endIndex)
      .then(res => res.json())
      .then((json) => {
        dispatch(HomePageActions.homePageObjectsFetched(json, { startIndex, endIndex }));
      })
  },

  homePageObjectsFetched: (response, indexObject) => ({ type: HomePageActionTypes.GET_OBJECT, payload: { data: response, ...indexObject } }),

  objectClicked: (objectMetaData) => ({ type: HomePageActionTypes.OBJECT_CLICKED, payload: objectMetaData }),

  closeModal: () => ({ type: HomePageActionTypes.CLOSE_MODAL }),
};

export {
  HomePageActions,
  HomePageActionTypes,
};
