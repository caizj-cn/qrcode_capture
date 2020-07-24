/*
 * @Author: caizhijun
 * @Date: 2020-07-24 14:00:46
 * @LastEditors: caizhijun
 * @LastEditTime: 2020-07-24 17:18:44
 * @Description: file content
 */ 

cc.Class({
    extends: cc.Component,

    properties: {
        camera: cc.Camera,
        _canvas: null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    capture(){
        let texture = new cc.RenderTexture();
        let gl = cc.game._renderContext;
        // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        this.camera.targetTexture = texture;

        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        this.camera.render(this.node.parent);

        // 这样我们就能从 RenderTexture 中获取到数据了
        let data = texture.readPixels();

        // 接下来就可以对这些数据进行操作了
        let width = this.node.width;
        let height = this.node.height;
        if(this._canvas == null){
            this._canvas = document.createElement('canvas');
            this._canvas.width = width;
            this._canvas.height = height;
            
        }else{
            this.clearCanvas();
        }

        let rect = this.node.getBoundingBox();
        let vec2 = new cc.Vec2(rect.x, rect.y);
        vec2.x += (cc.visibleRect.width / 2);
        vec2.y += (cc.visibleRect.height / 2);

        let startX = Math.floor(vec2.x);
        let startY = Math.floor(vec2.y);
        
        let ctx = this._canvas.getContext('2d');
        const MaxWidth = Math.floor(cc.visibleRect.width);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            //createImageData(width,height)
            let imageData = ctx.createImageData(width, 1);
            let start = (startX + (srow + startY) * MaxWidth) * 4;

            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            //putImageData(imgData,x,y)左上
            ctx.putImageData(imageData, 0, row);
        }
        
        let dataURL = this._canvas.toDataURL("image/png");

        return dataURL;
    },

    clearCanvas () {
        let ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    },
    
});
