import {
    UNIT_CONVERSION,
    SaveCodeImg,
    SetGradient,
    getTimeDate,
    GETSIZE,
    getPixelRatio
} from '../common/support'

// export const WidgetScratch = function(opt: StrongCode.ScratchProps,callback?: Function){
//     if (!opt.result.text || !opt.result.img) {
//         console.warn("没有找到中奖信息");
//         return
//     }
//     if (!opt.id){
//         console.warn("没有找到canvas id或者实列!");
//         return
//     }
//     //二维码绘制时间记录开始
//     const timeStar: number = new Date().getTime();
//     const scratch: Scratch = new Scratch()
    

// }
export class WidgetScratch {

    private touch: Array<StrongCode.ScratchTouchProps> = [];
    private ctx: UniApp.CanvasContext;
    private parameter: StrongCode.ScratchProps
    private width: number = 0;
    private height: number = 0;

    constructor(parameter: StrongCode.ScratchProps) {
        this.parameter = parameter;
        this.width = UNIT_CONVERSION(this.parameter.width) // rpx->px
        this.height = UNIT_CONVERSION(this.parameter.height)// rpx->px

        if (Object.prototype.toString.call(parameter.id) == '[object String]') {
            this.ctx = uni.createCanvasContext(<string>parameter.id, parameter.ctx || null);
        } else {//兼容 nvue
            this.ctx = parameter.id as UniApp.CanvasContext;
        }
        this.init()
    }
    private init () {
        if (!this.parameter.result.text || !this.parameter.result.img) {
            console.warn("没有找到中奖信息");
            return
        }
        if (!this.parameter.id){
            console.warn("没有找到canvas id或者实列!");
            return
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.setFillStyle(this.parameter.bgColor || "#C5C5C5");
		this.ctx.fillRect(0, 0, this.width, this.height);//设置画布大小
		this.ctx.setFillStyle("#FFFFFF")
		this.ctx.fillRect(

            UNIT_CONVERSION(this.parameter.padding || 0),// x坐标
            UNIT_CONVERSION(this.parameter.padding || 0), // y坐标
            this.width - UNIT_CONVERSION(this.parameter.padding || 0)*2, // 实际宽度
            this.height - UNIT_CONVERSION(this.parameter.padding || 0)*2 // 实际高度
        );
		//绘制文字
        this.ctx.setTextAlign('center');//'left'、'center'、'right'
		this.ctx.setTextBaseline('middle');//可选值 'top'、'bottom'、'middle'、'normal'
		this.ctx.font = this.parameter.result.font || "bold 30px system-ui",
		this.ctx.setFillStyle("#F0AD4E");
		this.ctx.fillText(this.parameter.result.text, this.width/2, this.height/2);

    }
    public touchMove (x: number,y: number) {
        let point: StrongCode.ScratchTouchProps = {
            x: x,
            y: y
        }
        this.touch.push(point);
        
    }
    public touchEnd () {
        this.touch = []
    }
    public touchStart (x: number,y: number) {
        let point: StrongCode.ScratchTouchProps = {
            x: x,
            y: y
        }
        this.touch.push(point);
    }
    private draw (ctx: UniApp.CanvasContext) {
        // if(this.touch.length >= 2) {
        //     this.ctx.setLineWidth(30);//线条宽度单位px
        //     this.ctx.setLineCap('round');//线条的结束端点样式
        //     this.ctx.setLineJoin('round');//线条
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(this.touch[0].x, this.touch[0].y);
        //     for(let i = 0;i<this.touch.length;i++){
        //         this.ctx.lineTo(this.touch[i].x , this.touch[i].y);
        //     }
        //     this.ctx.clearRect(0,0,20,10)
        //     this.ctx.stroke();
        //     this.ctx.closePath();
        // }
        // this.ctx.draw(true)
    }
}