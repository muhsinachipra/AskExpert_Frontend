// frontend\src\main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEAUTH_CLIENTID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)








// // frontend\src\main.tsx

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import { Provider } from 'react-redux'
// import { store } from './app/store.ts'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'

// const persistor = persistStore(store)

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEAUTH_CLIENTID}>
//         <PersistGate persistor={persistor}>
//           <App />
//         </PersistGate>
//       </GoogleOAuthProvider>
//     </Provider>
//   </React.StrictMode>,
// )



