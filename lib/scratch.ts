import {
    UNIT_CONVERSION,
} from '../common/support'

export class WidgetScratch {

    private touch: Array<StrongCode.ScratchTouchProps> = [];
    private ctx: UniApp.CanvasContext;
    private mackCtx: UniApp.CanvasContext;
    private parameter: StrongCode.ScratchProps
    private width: number = 0;
    private height: number = 0;
    private padding: number = 0;
    private margin: number = 0;

    constructor(parameter: StrongCode.ScratchProps) {
        this.parameter = parameter;
        this.width = UNIT_CONVERSION(this.parameter.width) // rpx->px
        this.height = UNIT_CONVERSION(this.parameter.height)// rpx->px
        this.padding = UNIT_CONVERSION(this.parameter.padding || 0) // rpx->px
        this.margin = UNIT_CONVERSION(this.parameter.margin || 0)// rpx->px

        if (Object.prototype.toString.call(parameter.id) == '[object String]') {
            this.ctx = uni.createCanvasContext(<string>parameter.id, parameter.ctx || null);
            this.mackCtx = uni.createCanvasContext(<string>parameter.mackId, parameter.ctx || null);
        } else {//兼容 nvue
            this.ctx = parameter.id as UniApp.CanvasContext;
            this.mackCtx = parameter.mackId as UniApp.CanvasContext;
        }
        this.init();
        this.maskArea();
    }
    private init (): void {
        if (!this.parameter.result.text || !this.parameter.result.img) {
            console.warn("没有找到中奖信息");
            return
        }
        if (!this.parameter.id){
            console.warn("没有找到canvas id或者实列!");
            return
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.setFillStyle(this.parameter.bgColor1 || "#C5C5C5");
		this.ctx.fillRect(0, 0, this.width, this.height);//设置画布大小
		this.ctx.setFillStyle(this.parameter.bgColor2 ||"#FFFFFF");
        //中奖区域
		this.ctx.fillRect(
            this.padding,// x坐标
            this.padding, // y坐标
            this.width - this.padding*2, // 实际宽度
            this.height - this.padding*2 // 实际高度
        );
		//中奖信息文字绘制
        this.ctx.setTextAlign('center');//'left'、'center'、'right'
		this.ctx.setTextBaseline('middle');//可选值 'top'、'bottom'、'middle'、'normal'
		this.ctx.font = this.parameter.result.font || "bold 30px system-ui",
		this.ctx.setFillStyle("#F0AD4E");
		this.ctx.fillText(this.parameter.result.text, this.width/2, this.height/2);

        const x: number = this.padding;
        const y: number = this.padding;
        const h: number = this.width - this.padding*2;
        const w: number = this.height - this.padding*2;
        //中奖信息图片展示
        this.parameter.result.img ? this.ctx.drawImage('/static/scratch_music.png', x,y,w,h) : false;
        this.ctx.draw(false);
    }
    private maskArea (): void {
        const x: number = this.padding;
        const y: number = this.padding;
        const h: number = this.width - this.padding*2 - this.margin*2;
        const w: number = this.height - this.padding*2 - this.margin*2;
        this.mackCtx.clearRect(x, y, w, h);
        this.mackCtx.setFillStyle(this.parameter.maskColor || "#C5C5C5");
		this.mackCtx.fillRect(x,y,w,h);//设置画布大小
		this.parameter.maskImg ? this.mackCtx.drawImage(this.parameter.maskImg, x,y,w,h) : false;
		this.mackCtx.draw(false)
    }
    public touchMove (x: number,y: number): void {
        let point: StrongCode.ScratchTouchProps = {
            x: x,
            y: y
        }
        this.touch.push(point);
        this.draw();
        
    }
    public touchEnd (): void {
        this.touch = [];
    }
    public touchStart (x: number,y: number) {
        let point: StrongCode.ScratchTouchProps = {
            x: x,
            y: y
        }
        this.touch.push(point);
    }
    private draw (): void {
        if(this.touch.length >= 2) {
            this.mackCtx.setLineWidth(30);//线条宽度单位px
            this.mackCtx.setLineCap('round');//线条的结束端点样式
            this.mackCtx.setLineJoin('round');//线条
            this.mackCtx.beginPath();
            this.mackCtx.moveTo(this.touch[0].x, this.touch[0].y);
            for(let i = 0;i<this.touch.length;i++){
                this.mackCtx.lineTo(this.touch[i].x , this.touch[i].y);
            }
            this.mackCtx.clearRect(0,0,20,10)
            this.mackCtx.stroke();
            this.mackCtx.closePath();
        }
        this.mackCtx.draw(true);
    }
}