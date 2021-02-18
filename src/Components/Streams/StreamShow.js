import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { featchStream } from "../Actions/index";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.featchStream(id);
    // flv.createPlayer({
    //   type: "flv",
    //   url: `https://localhost:8000/live/${id}`,
    // });
    // this.player.attachMediaElement(this.videoRef.current);
    // this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loding...</div>;
    }
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h2>{this.props.stream.title}</h2>
        <p>{this.props.stream.description}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { featchStream })(StreamShow);
