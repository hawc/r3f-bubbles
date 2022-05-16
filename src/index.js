import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles.css'
import {preloadFont} from 'troika-three-text'
import fonts from './fonts';

const opts = {
  font: "Roboto Slab",
  fontSize: 6,
  color: "#010101",
  maxWidth: 300,
};

preloadFont(
  {
    font: fonts[opts.font],
    characters: 'abcdefghijklmnopqrstuvwxyz'
  },
  () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }
)

