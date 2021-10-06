class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      visibile: false,
    };
  }
  handleToggle() {
    this.setState(() => {
      return {
        visibile: !this.state.visibile,
      };
    });
  }
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggle}>
          {this.state.visibile ? 'Hide details' : 'Show details'}
        </button>
        <p>
          {this.state.visibile &&
            'These are some of the details available now. Have fun!'}
        </p>
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));
