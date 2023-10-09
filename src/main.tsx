import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import VideoProvider from './features/videos/context/VideoContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <VideoProvider>
                <App />
            </VideoProvider>
        </Provider>
    </React.StrictMode>,
);
