import React from 'react';
import Route from 'react-router-dom/Route'


import lazyLoadComponent from './config/bundle';
const Index = lazyLoadComponent(() => import('./containers/index/index.component'))
const Music = lazyLoadComponent(() => import('./containers/music/index.component'))
const Home = lazyLoadComponent(() => import('./containers/home/index'))


const App= () => {
    return (
		<div className="root">
            <Route
                component={Home}
                exact
                path="/"
            />
		</div>
    )
}
export default App
