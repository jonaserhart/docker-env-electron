import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './frontend/App';
import { store } from './frontend/app/store';

declare global { 
    interface Window {
        api: {
        send: (channel: string, ...arg: any[]) => void;
        receive: (channel: string, func: (...arg: any[]) => void) => void;
        }
    }
}

function render() {
  ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>, document.getElementById('root'));
}
render();