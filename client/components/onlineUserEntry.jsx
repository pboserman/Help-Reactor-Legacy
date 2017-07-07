import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class OnlineUserEntry extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      stream: '',
      showCamera: false
    };
    this.toggleCamera = this.toggleCamera.bind(this);
  }

  toggleCamera () {
    if (!this.state.showCamera) {
      var camera = this.Camera();
      navigator.getUserMedia(camera.constraints, camera.onSuccess, camera.onError);
    } else {
      this.state.stream.getTracks().forEach(track => track.stop());
    }
    this.setState((prevState) => {
      return { showCamera: !prevState.showCamera };
    });
  }

  Camera () {
    return {
      constraints: {
        video: true,
        audio: true
      },
      onSuccess: (stream) => {
        window.stream = stream;
        var src;
        if (window.URL) {
          src = window.URL.createObjectURL(stream);
        } else {
          src = stream;
        }
        this.setState({
          stream: src
        });
      },
      onError: (error) => {
        console.error('Camera error: ', error);
      }
    };
  }

  CameraModal () {
    return (
      <Modal
          show={this.state.showCamera} 
          bsSize='large'
          onHide={this.toggleCamera}>
          <Modal.Header closeButton>
          <Modal.Title>Video Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <video src={this.state.stream} autoPlay></video>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleCamera}>Close</Button>
          </Modal.Footer>
      </Modal>
    )
  }

  render () {
    return (
      <div className="modal-entry-container">
      <img className="modal-entry-img" src={this.props.user.avatarUrl} />
      <div className="modal-entry-name modal-entry">
        <a href={`https://www.github.com/${this.props.user.username}`} target="_blank">
          <div>{this.props.user.firstName} {this.props.user.lastName}</div>
        </a>
      </div>
      <div className="modal-entry-username modal-entry">{this.props.user.username}</div>
      <div className="modal-entry-username modal-entry">{this.props.responseTime} Minutes</div>
      <div className="modal-entry-username modal-entry">{this.props.resolutionTime} Minutes</div>
      <button onClick={this.toggleCamera} className="modal-entry-video-chat modal-entry fa fa-video-camera"></button>
      {this.CameraModal()}
      </div>
    );
  }
}

export default OnlineUserEntry;