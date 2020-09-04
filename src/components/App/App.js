import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { pushRow, editRow } from "../../redux/actions/actions";
import { getRows } from "../../redux/selectors/selectors";

const mapStateToProps = (state, ownProps) => ({
  // we need this for accessing common state
  // ... computed data from state and optionally ownProps
  // ... can also be function that return object of functions
  getRows: getRows(state),
});

const mapDispatchToProps = {
  // we need this for accessing common actions
  // ... normally is an object full of action creators
  pushRow,
  editRow,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  addPeople() {
    this.props.pushRow("New entry");
  }

  editPeople() {
    this.props.editRow({ index: this.state.index, value: "Edited entry" });
  }

  handleIndex(e) {
    this.setState({
      index: parseInt(e.target.value),
    });
  }

  render() {
    return (
      <div className="App">
        <input
          value={"Push"}
          type="button"
          onClick={this.addPeople.bind(this)}
        />

        <input
          id="index"
          type="number"
          value={this.state.index}
          onChange={this.handleIndex.bind(this)}
        />
        <input
          value={"Edit"}
          type="button"
          onClick={this.editPeople.bind(this)}
        />
        {this.props.getRows.map((row, index) => (
          <p key={index}>{row}</p>
        ))}
      </div>
    );
  }
}

// connect is needed to access and bind common states and actions
// if we don't provide connect, component will not re-render on store changes.
export default connect(mapStateToProps, mapDispatchToProps)(App);
