import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import 'aframe';
import 'aframe-particle-system-component';
import { Entity, Scene } from 'aframe-react';

import { HomePageActions } from '../../actions';
import './three-d-view.css';

class ThreeDView extends Component {
  static propTypes = {
    objectData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
  };

  state = {
    yRotation: 0,
  }

  handleModalClose = () => {
    this.props.dispatch(HomePageActions.closeModal());
  }

  renderObject = () => {
    // this.updateRotation()
    return (
    <Scene
      background={{ color: 'rgba(0, 0, 0, 0.5)' }}
      height={300}
      width={300}
    >
      <a-assets>
        <a-asset-item id="tree-obj" src={`/resources/obj/${this.props.objectData.object.obj}`}></a-asset-item>
      </a-assets>
      <Entity
        obj-model="obj: #tree-obj;"
        color="green"
        intensity={1}
        scale={{ x: 0.5, y: 0.5, z: 0.5 }}
        position={{ x: 0, y: -3, z: -15}}
        rotation={`0 0 0`}
        vive-controls={{hand: 'left'}}
        vr-mode-ui="enabled: false"
      />
      <Entity particle-system={{preset: 'snow', particleCount: 5000 }}  cursor-listener />
      <Entity light={{type: 'point'}}/>
    </Scene>
    )
  };

  updateRotation = () => {
    setTimeout(() => { this.setState({ yRotation: this.state.yRotation + 10 })}, 200);
  }

  render() {
    const { objectData, showModal } = this.props;

    return (
      <div className='object-container'>
        <Header>{`3D view of a ${objectData.object.name}`}</Header>
        <Icon name='close' onClick={this.handleModalClose} />
        {this.renderObject()}
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  showModal: store.homePage.showModal,
});

export default connect(mapStateToProps)(ThreeDView);
