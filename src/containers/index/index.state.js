import { observable, action, computed, useStrict } from 'mobx';

class indexState {
    @observable container = {
        musicList	: [],
        currentMusic : {},
        play : false,
        allTime : 0,
        currentTime : 0,
        bufferTime : 0,
        audio : null
    };

    @observable initPlay = true;
    
    @action changeMusicStatus(stu){
    	this.container.play = stu;
    };
    @action changeMusicList(list){
        this.container.musicList = list;
    }
    @action changeCurrentMusic(list){
        this.container.currentMusic = list;
    }

    //计算属性用于 缓存 计算后的值，只有期内部的依赖属性改变，才会重现计算
    @computed get getInitPlay(){ 
        return this.initPlay = true;
    }
}

export default new indexState()