import React from 'react';
import './header.scss';

class HeaderComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            logo : require('./img/logo.png')
        }
    }

    render(){
        return (
            <div className="headBox">
                <div className="logo">
                    <img src={this.state.logo} />
                </div>
                <div className="navs">
                    <div className="nav arrow"><a>编程课程</a></div>
                    <div className="nav arrow"><a>编程教程</a></div>
                    <div className="nav arrow"><a>少儿编程教育</a></div>
                    <div className="nav arrow"><a>少儿编程社区</a></div>
                </div>
                <div className="else">
                    <input placeholder="搜索"/>
                </div>
            </div>
        )
    }
}

export default HeaderComponent