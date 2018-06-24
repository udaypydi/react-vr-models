import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'aframe';
import 'aframe-particle-system-component';

import { HomePageActions } from '../../actions';
import './three-d-view.css';

class ThreeDView extends Component {
  static propTypes = {
    objectData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
  };

  renderObject = () => {
    return (
      <a-scene embedded>
        <a-assets>
          <a-asset-item id="tree-obj" src={`/resources/obj/${this.props.objectData.object.obj}`}></a-asset-item>
        </a-assets>
        <a-entity obj-model="obj: #tree-obj;" position="0 0 -20"></a-entity>
        <a-animation 
          attribute="rotation"
          dur="10000"
          fill="forwards"
          to="0 360 0"
          repeat="indefinite"
        >
        </a-animation>
        <a-light type="ambient" color="#445451"></a-light>
        <a-light type="point" intensity="2" position="2 4 4"></a-light>
      </a-scene>
    )
  };

  updateRotation = () => {
    setTimeout(() => { this.setState({ yRotation: this.state.yRotation + 10 })}, 200);
  }

  render() {
    const { objectData, showModal } = this.props;

    return (
      <div>
        {this.renderObject()}
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  showModal: store.homePage.showModal,
});

export default connect(mapStateToProps)(ThreeDView);
