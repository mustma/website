import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import PageComponent from '../../components/PageComponent';
import Header from './components/header/header';
import KeepRecord from '../../components/footer/index';

import './index.scss';

@observer
class HomeComponent extends PageComponent{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="homePage">
                <Header></Header>
                <div className="banner">
                    <img src={require('./img/banner.jpg')}/>
                </div>
                <KeepRecord></KeepRecord>
            </div>
        )
    }
}

export default HomeComponent