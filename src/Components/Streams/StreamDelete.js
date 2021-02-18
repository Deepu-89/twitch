import React from "react";
import Model from "../Model";
import history from "../../history";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { featchStream, deleteStream } from "../Actions/index";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.featchStream(this.props.match.params.id);
  }
  onClick = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderActions() {
    return (
      <React.Fragment>
        <button onClick={this.onClick} className="ui  negative button">
          Delete
        </button>
        <Link to="/" className="ui  button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are You sure you want to delete this stream ?";
    }
    return `Are You sure you want to delete this stream with title:${this.props.stream.title}`;
  }

  render() {
    return (
      <Model
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { featchStream, deleteStream })(
  StreamDelete
);
