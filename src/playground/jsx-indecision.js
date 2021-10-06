//JSX
const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: [],
};
const onFormSubmit = e => {
  e.preventDefault();
  const option = e.target.elements.option.value;
  if (option) {
    q;
    app.options.push(option);
    e.target.elements.option.value = '';
  }
  render();
};
const onRemoveAll = () => {
  app.options = [];
  render();
};
const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const renderList = arr =>
  arr.map(item => (
    <li key={item}>
      <p>{item}!</p>
    </li>
  ));

const array = [44, 45, 46, 57];
const appRoot = document.getElementById('app');

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <p>
        <b>{app.subtitle} </b>{' '}
      </p>
      <p>
        {app.options.length > 0
          ? 'Here are your options'
          : 'No options yet! Please enter your options ;)'}
      </p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>
        What Should I do?
      </button>
      <button onClick={onRemoveAll}>Remove All</button>
      <ol>{renderList(app.options)}</ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};
render();
