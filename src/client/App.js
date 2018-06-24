import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import HomePage from './components/homepage';
import CategoriesContainer from './components/categories';
import { HomePageActions } from './actions';
import data from './resources/data/objects.json';
import './app.css';

class App extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    startIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(HomePageActions.getObjects());
  }

  loadMoreItems = () => {
    const { startIndex, endIndex } = this.props;

    this.props.dispatch(HomePageActions.getObjects(startIndex + 2, endIndex));
  }

  render() {
    
    const { data } = this.props;

    return (
      <div>
        <HomePage />
        {data && data.length > 0 &&
           <CategoriesContainer data={data} />
        }
        <div className='button-container'>
          <Button icon labelPosition='left' primary onClick={this.loadMoreItems}>
            <Icon name='hand point down outline' />
            Load More
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  data: store.homePage.objectsData,
  startIndex: store.homePage.startIndex,
  endIndex: store.homePage.endIndex
});

export default connect(mapStateToProps)(App);

