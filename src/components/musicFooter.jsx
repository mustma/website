import React,{ Component } from 'react';
import './musicFooter.scss';

import { observer } from 'mobx-react';


@observer
class MusicFooter extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        
    }
    handerPlay(){
        let isplay = this.props.isplay;
        this.props.changeStatus(!isplay);
    }
    nextPlay(type){
        this.props.next(type);
    }
    changeMusicProgress(e){
        let progress = (e.pageX - this.silderBar.getBoundingClientRect().left) / this.silderBar.offsetWidth * 100;
        this.props.changeProgress(progress);
    }
    render(){
        let props = this.props;
        return (
            <div className="music-footer">
                <div className="box">
                    <div className="silder-box" ref={el => this.silderBar = el} onClick={(e)=>this.changeMusicProgress(e)}>
                        <div className="buffer-bar" style={{width:`${props.bufferTime}%`}}></div>
                        <div className="silder-bar" style={{width:`${props.currentTime}%`}}></div>
                    </div>
                    <div className="slider-content">
                        <div className="music-l">
                            <p className="music-name">{props.currentMusicName}</p>
                            <p className="nicname">{props.name}</p>
                        </div>
                        <div className="music-r">
                            <div className={`play mr30${props.isplay ? ' icon-pause' : ' icon-play'}`}  onClick={()=>this.handerPlay()}></div>
                            <div className="next icon-next mr30" onClick={()=>this.nextPlay('next')}></div>
                            <div className="menu icon-menu"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicFooter;