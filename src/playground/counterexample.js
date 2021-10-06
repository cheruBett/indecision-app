class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 8,
    };
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('count');
      const count = parseInt(json, 10);
      if (isNaN(count)) return;
      this.setState(() => ({ count }));
    } catch (e) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count === this.state.count) return;
    const json = JSON.stringify(this.state.count);
    localStorage.setItem('count', json);
  }
  handleAddOne() {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }
  handleMinusOne() {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  }
  handleReset() {
    this.setState(() => ({ count: 0 }));
  }

  render() {
    return (
      <div>
        <h1>Count:{this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
/*    "babel-cli": "6.24.1",
    "babel-preset-env": "1.5.2",
    "babel-preset-react": "6.24.1",
    "live-server": "^1.2.1",
    "webpack": "3.1.0"
 */
