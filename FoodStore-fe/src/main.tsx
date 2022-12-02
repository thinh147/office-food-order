import { ProviderContext } from '@context'
import React from 'react'
import ReactDOM from 'react-dom'
// import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'

const el = document.getElementById('root');

if (!el) {
  throw new Error('Root container missing in index.html')
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderContext>
        <App />
      </ProviderContext>
    </BrowserRouter>
  </React.StrictMode>, el
)
