import React,{ Component } from 'react';
import MusicItem from './musicItem';

import './musicList.scss';

class MusicList extends Component{
    constructor(props){
        super(props)
    }
    editorCurrentMusicCB(id){
        this.props.list.map((v,i) => {
            if(v.id == id){
                this.props.checkedCurrentMusic(i);
                return;
            }
        })
    }
    render(){
        let props = this.props;
        return (
            <div className="music-list">
                {
                    props.list.map((v,i) => {
                        return <MusicItem
                                    title={v.name}
                                    id={v.id}
                                    checked={v.id == props.currId}
                                    editorCurrentMusic={this.editorCurrentMusicCB.bind(this)}
                                ></MusicItem>
                    })
                }
            </div>
        )
    }
}

export default MusicList;