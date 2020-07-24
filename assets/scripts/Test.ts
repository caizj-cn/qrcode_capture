/*
 * @Author: caizhijun
 * @Date: 2020-07-24 14:29:34
 * @LastEditors: caizhijun
 * @LastEditTime: 2020-07-24 17:19:42
 * @Description: file content
 */ 

import QRCode = require('./QRCode');
import Capture = require('./Capture');

const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    @property(cc.Node)
    qrcode: cc.Node = null;

    @property(cc.Node)
    capture: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    onClick(event:any, data:string){
        switch(data){
            case 'qr':{
                this.qrcode.getComponent('QRcode').makeCode('aaaaaaaaaaa');                
                break;
            }
            case 'cap':{
                let dataURL = this.capture.getComponent('Capture').capture();
                cc.log(`dataURL===>`, dataURL);
                break;
            }
        }
    }
}
