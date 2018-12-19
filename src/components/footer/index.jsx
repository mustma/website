import React, { Component } from 'react';
import './index.scss';

class KeepRecord extends Component {
    constructor() {
        super();
    }
    render() {

        return (
            <div id='KeepRecord' className="recordPage">
                <a target="_blank" rel="noopener noreferrer" href="http://www.miitbeian.gov.cn/">
                    <img src={require('./img/keep_record.png')} />
                    <span>沪ICP备18042977号-1</span>
                </a>
            </div>
        )
    }
}

export default KeepRecord