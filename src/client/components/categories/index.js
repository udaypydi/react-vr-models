import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ThreeDView from '../threedview';
import './categories-container.css';
import { HomePageActions } from '../../actions';

const CategoriesContainer = (props) => {

  CategoriesContainer.propTypes = {
    objectMetaData: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  const handleObjectClick = (metaData, categoryName) => () => {
    const objectMetaData = {
      categoryName,
      object: metaData,
    };

    props.dispatch(HomePageActions.objectClicked(objectMetaData));
  };

  const renderObjectCategories = () => (
    props.data.map((categories, index) => (
      <Segment raised key={index}>
        <h1>{categories.name}</h1>
        <div className='object-categories-container'>
          {
            categories.models.map((object, index) => (
              <img src={object.thumb} key={index} className='object-image' onClick={handleObjectClick(object, categories.name)} />
            ))
          }
        </div>
      </Segment>
    ))
  );


  return (
    <div className='container'>
      {renderObjectCategories()}
      {props.objectMetaData && Object.keys(props.objectMetaData).length > 0 &&
        <ThreeDView objectData={props.objectMetaData} className='three-d-view-container' />
      }
    </div>
  )
}

const mapStateToProps = (store) => ({
  objectMetaData: store.homePage.clickedObjectMetaData,
});

export default connect(mapStateToProps)(CategoriesContainer);
