import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import './index.scss'
import 'react-viewer/dist/index.css'



const Index = () => <App />

ReactDOM.render(<Index />, document.getElementById('index'))
