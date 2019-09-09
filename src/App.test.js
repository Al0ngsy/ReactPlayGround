import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Unit Test - Testing one isolated function, or one React component
// only have one currently
describe('React component test with Enzyme', () => {
  it('renders without crashing', () => {
     shallow(<App />);
   });
});

// Integration Test - Testing a multitude of functions working together, or an entire React component including children components
// quite pointless currently because there are no children
describe('React component test with Enzyme', () => {
  it('renders without crashing', () => {
     mount(<App />);
   });
});