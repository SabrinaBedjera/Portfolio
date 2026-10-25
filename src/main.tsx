import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ConsentBanner from './ConsentBanner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ConsentBanner />
  </React.StrictMode>,
)
