import React, { Component } from 'react';

class PageComponent extends Component{
    constructor(){
        super();
        this._complete();
    }

    _complete(){
        this.perFormance();
        this.onEorr();
    }

    /**
     * 性能统计
     */
    perFormance(){
        const timing = window.performance.timing;
        // DNS查询耗时
        let domainTime = timing.domainLookupEnd - timing.domainLookupStart;
        // TCP连接耗时
        let connectTime = timing.connectEnd - timing.connectStart;
        // 静态资源加载耗时
        let loadFilesTime = timing.responseEnd - timing.requestStart;
        // firstbyte：首包时间
        let firstPkgTime = timing.responseStart - timing.domainLookupStart;	
        // First Paint Time, 首次渲染时间 / 白屏时间
        let firstRenderTime = timing.responseEnd - timing.fetchStart;
        // Time to Interact，首次可交互时间	
        let handlerTime = timing.domInteractive - timing.fetchStart;
        // ready：HTML 加载完成时间，即 DOM 就位的时间
        let DOMLoadTime = timing.domContentLoaded - timing.fetchStart;
        // load：页面完全加载时间
        let ContentLoadDoneTime = timing.loadEventStart - timing.fetchStart;
        let TimeObject = {
            domainTime,
            connectTime,
            loadFilesTime,
            firstPkgTime,
            firstRenderTime,
            handlerTime,
            DOMLoadTime,
            ContentLoadDoneTime
        }
        console.log(JSON.stringify(TimeObject));
    }
    /**
     * 收集错误信息
     */
    onEorr(){
        /**
         * @param {String}  msg   错误信息
         * @param {String}  url      出错的文件
         * @param {Long}    lineNo     出错代码的行号
         * @param {Long}    columnNo   出错代码的列号
         * @param {Object}  error       错误的详细信息，Anything
         */
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            let string = msg.toLowerCase();
            let substring = 'script error';

            if (string !== substring && !url) {
                return true;
            }
            let message = [
                `message=${string}`,
                `url=${url}`,
                `line=${lineNo}`,
                `column=${columnNo}`
                // `errorObject=${JSON.stringify(error.stack)}`
            ];
            if (location.host.indexOf('localhost') === -1) {
                new Image().src = `//www.mxiangze.com/a.gif?${message.join('&')}`;
            }
            return false;
        };
    }

    render() {
        return '';
    }
}

export default PageComponent;