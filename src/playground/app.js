class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      options: [],
    };
  }
  //persisting data
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) this.setState(() => ({ options }));
    } catch (e) {
      //
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length === this.state.options.length) return;
    const json = JSON.stringify(this.state.options);
    localStorage.setItem('options', json);
  }
  //handlesingledelete
  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: this.state.options.filter(item => optionToRemove !== item),
    }));
  }
  //handlealldelets
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }
  //alert the random decision
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  //handleAddOption
  handleAddOption(newOption) {
    if (!newOption) return 'Enter a valid value to add item';
    if (this.state.options.indexOf(newOption) > -1)
      return `The (${newOption}) option already exist`;

    this.setState(prevState => ({
      options: prevState.options.concat(newOption),
    }));
  }
  render() {
    const title = 'Indecision App';
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}
//settind defaults for indecison app
const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};
const Action = props => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePick}>
        What Should I do Computer?
      </button>
    </div>
  );
};
const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All!!</button>
      {props.options.length === 0 && (
        <p>Please add an option to get started!</p>
      )}

      <ol>
        {props.options.map(item => (
          <li key={item}>
            <Option
              option={item}
              handleDeleteOption={props.handleDeleteOption}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};
const Option = props => {
  return (
    <div>
      {props.option}
      <button
        onClick={e => {
          props.handleDeleteOption(props.option);
        }}
      >
        remove
      </button>
    </div>
  );
};
class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOptions = this.handleAddOptions.bind(this);
    this.state = {
      error: undefined,
    };
  }
  handleAddOptions(e) {
    e.preventDefault();
    const newOption = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(newOption);
    this.setState(() => ({ error }));
    if (!error) e.target.elements.option.value = '';
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOptions}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
        <p>{this.props.options}</p>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
