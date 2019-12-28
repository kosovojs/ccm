import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './store'
import App from './App/container'
import './styles.css';

const getStore = store();//createStore(rootReducer)

render(
	<Provider store={getStore}>
		<App />
	</Provider>,
	document.getElementById('app')
)