import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import 'aframe';
import 'aframe-particle-system-component';

import { HomePageActions } from '../../actions';
import './three-d-view.css';

class ThreeDView extends Component {
  static propTypes = {
    objectData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state={
    axisZoom: 0.5,
  };

  renderObject = () => {
    return (
      <a-scene embedded>
        <a-assets>
          <a-asset-item id="tree-obj" src={this.props.objectData.object.obj}></a-asset-item>
          <a-asset-item id="tree-mtl" src={this.props.objectData.object.mtl}></a-asset-item>
        </a-assets>
        <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" position="0 0 -20" scale={`${this.state.axisZoom} ${this.state.axisZoom} ${this.state.axisZoom}`}></a-entity>
        <a-light type="ambient" color="#445451"></a-light>
        <a-light type="point" intensity="2" position="2 4 4"></a-light>
      </a-scene>
    )
  };

  zoomZAxis = (type) => () => {
    if(type === 'plus') {
      this.setState({ axisZoom: this.state.axisZoom + 0.1 });
    } else {
      this.setState({ axisZoom: this.state.axisZoom - 0.1 });
    }
  }

  render() {
    const { objectData } = this.props;
    return (
      <div>
        {objectData && Object.keys(objectData).length > 0 &&
          <div>
            {this.renderObject()}
            <div className='zoom-button-container'>
              <Button.Group>
                <Button icon onClick={this.zoomZAxis('plus')}>
                  <Icon name='zoom'/>
                </Button>
                <Button icon onClick={this.zoomZAxis('minus')}>
                  <Icon name='zoom out' />
                </Button>
              </Button.Group>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  objectData: store.homePage.clickedObjectMetaData,
});

export default connect(mapStateToProps)(ThreeDView);
