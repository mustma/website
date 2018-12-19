import React from 'react';

import { observer } from 'mobx-react';
import { Button } from 'antd';
import axios from 'axios';

@observer
class Index extends React.Component {
    componentWillMount(){

        // axios.get('/loca/jj').then(function (data) {
        //     console.log(data)
        // })
    }
    render(){
        return (
            <div className="page music">
                <Button>开始</Button>
            </div>
        )
    }
}

export default Index;