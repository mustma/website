import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './root';

import './app.scss';

const render = Component => {
    ReactDOM.render(
        <AppContainer warnings={false}>
            <BrowserRouter>
                <Component />
            </BrowserRouter>
        </AppContainer>,
        document.getElementById('content')
    )
}

render(App)

if(module.hot) {
    module.hot.accept('./root', () => {
        const NextRootContainer = require('./root').default
        render(NextRootContainer)
    })
}







