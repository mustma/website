import React from 'react';

import { observer } from 'mobx-react';
//import { Button } from 'antd';
import MusicList from '../../components/musicList'
import MusicItem from '../../components/musicItem'
import MusicFooter from '../../components/MusicFooter';

import indexState from './index.state';
import './index.scss';

import axios from 'axios';
import { Songs } from '../../config/data';

//组合方式  通过ref回调取该节点
const AudioComponent = props => {
    return (
        <div className="audio-C">
            <audio id="audio"
                src={ props.src ? props.src : ''} 
                ref = { props.audioRef }>
            </audio>
        </div>
    )
}

@observer
class Index extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        indexState.changeMusicList(Songs);
        indexState.changeCurrentMusic(Songs[0]);

        console.log(indexState.getInitPlay);
    }
    componentDidMount() {
        let audio = indexState.container.audio = this.audio;
        audio.addEventListener('canplay',()=>{
            let totalTime = parseInt(audio.duration);
            indexState.container.allTime = totalTime;
        })
        audio.addEventListener('timeupdate',() => {
            let timeRages = audio.buffered;
            let bufferedTime = 0
            if(timeRages.length !== 0){
                bufferedTime = timeRages.end(timeRages.length-1);
            }
            let bufferedPer = bufferedTime/indexState.container.allTime * 100;
            indexState.container.bufferTime = bufferedPer;

            let currentTime = audio.currentTime;
            let remainTime = currentTime/indexState.container.allTime * 100;
            indexState.container.currentTime = remainTime;
            if(audio.ended){
                this.playNext('next');
            }
        })
    }
    playCallBack(status){
        indexState.changeMusicStatus(status);
        this.play(status);
    }
    play(isplay){
        let audio = indexState.container.audio;
        if(isplay && indexState.container.currentMusic.src){
            setTimeout(()=>{ //解决快速切换的警告问题
                audio.play();
            },200)
        }else{
            audio.pause();
        }
    }
    playNext(type){
        let index = Math.max(0,indexState.container.musicList.indexOf(indexState.container.currentMusic));
        if(type === 'next'){
            index = (index+1) % indexState.container.musicList.length;
        }else{
            index = (index-1) % indexState.container.musicList.length;
        }
        indexState.container.currentMusic = indexState.container.musicList[index];
        indexState.changeMusicStatus(indexState.getInitPlay);
        this.play(indexState.getInitPlay);
    }

    checkedCurrentMusic(index){
        indexState.container.currentMusic = indexState.container.musicList[index];
        indexState.changeMusicStatus(indexState.getInitPlay);
        this.play(indexState.getInitPlay);
    }

    changeProgress(progress){
        let audio = indexState.container.audio;
        indexState.container.currentTime = progress;
        audio.currentTime = audio.duration * progress / 100;
    }

    render(){
        return (
            <div className="page index"> 
                <AudioComponent
                    src = {indexState.container.currentMusic.src}
                    audioRef = {el => this.audio = el}
                ></AudioComponent>

                <MusicList 
                    list = {indexState.container.musicList}
                    currId = {indexState.container.currentMusic.id}
                    checkedCurrentMusic={this.checkedCurrentMusic.bind(this)}
                ></MusicList>
                
                <MusicFooter
                    currentMusicName={indexState.container.currentMusic.name}
                    name={indexState.container.currentMusic.artist}
                    changeStatus={this.playCallBack.bind(this)}
                    isplay={indexState.container.play}
                    next={this.playNext.bind(this)}
                    bufferTime={indexState.container.bufferTime}
                    currentTime={indexState.container.currentTime}
                    changeProgress={this.changeProgress.bind(this)}
                ></MusicFooter>
            </div>
        )
    }
}

export default Index;