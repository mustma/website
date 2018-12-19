import React,{ Component } from 'react';
import './musicItem.scss';

class MusicItem extends Component{
    constructor(props){
        super(props)
    }
    changeMusic(id){
        this.props.editorCurrentMusic(id);
    }

    render(){
        let props = this.props;
        return (
            <div className={`musicItem${props.checked ? ' active' : ''}`} onClick={()=>this.changeMusic(props.id)} id={props.id}>
                {props.title}
            </div>
        )
    }
}

export default MusicItem;