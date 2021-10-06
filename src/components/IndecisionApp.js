import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };
  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  //handlesingledelete
  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: this.state.options.filter(item => optionToRemove !== item),
    }));
  };
  //handlealldelets
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  //alert the random decision
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }));
  };
  //handleAddOption
  handleAddOption = newOption => {
    if (!newOption) return 'Enter a valid value to add item';
    if (this.state.options.indexOf(newOption) > -1)
      return `The (${newOption}) option already exist`;

    this.setState(prevState => ({
      options: prevState.options.concat(newOption),
    }));
  };

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
  render() {
    const title = 'Indecision App';
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOption={this.handleDeleteOption}
              handleDeleteOptions={this.handleDeleteOptions}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
          <OptionModal
            handleClearSelectedOption={this.handleClearSelectedOption}
            selectedOption={this.state.selectedOption}
          />
        </div>
      </div>
    );
  }
}
export default IndecisionApp;
