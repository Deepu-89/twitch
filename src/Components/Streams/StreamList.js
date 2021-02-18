import React from "react";
import { connect } from "react-redux";
import { featchStreams } from "../Actions/index";
import { Link } from "react-router-dom";
class StreamList extends React.Component {
  componentDidMount() {
    this.props.featchStreams();
  }

  renderCreate() {
    if (this.props.isSignedIn === true) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }
  renderAdmin(stream) {
    // console.log(stream.userId);
    // console.log(this.props.currentUserId);
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderLIst = () => {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}

          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>

            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderLIst()}</div>
        <div style={{ marginTop: "5px" }}>{this.renderCreate()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { featchStreams })(StreamList);
