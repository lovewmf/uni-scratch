declare namespace StrongCode {

    /**
     * @description 刮刮乐
     * @param id String 画布的canvas-id 必传√
     * @param width Number 保存画布的宽度 单位rpx 必传√
     * @param height Number 保存画布的高度 单位rpx 必传√ß
     * @param padding Number 内边距 默认 0
     * @param margin Number 外边距 默认0
     * @param ctx Object 当前上下文 this
    */
    interface ScratchProps {
        id: string | UniApp.CanvasContext, //画布id
        mackId: string | UniApp.CanvasContext,
        width: string | number, // 画布宽度
        height: string | number, //画布高度
        padding?:string | number, // 内边距
        margin?: string | number, // 外边距
        bgColor1?: string,//画布背景色
        bgColor2?: string,//画布背景色
        maskColor?: string,//遮罩颜色
        maskImg?: string,// 遮罩图片 设置了此属性 遮罩颜色失效
        result: ScratchTextProps, //中奖信息
        ctx: AnyObject // 当前上下问=文 this
    }
    interface AnyObject {
        [key: string]: any;
    }
    interface ScratchTextProps {
        text: string,//恭喜你中奖了
        color?: string,// 文字颜色
        font?: string,//bold 30px system-ui
        img?: string //中奖结果可以图片展示 如果传入图片 其它参数失效
    }
    interface ScratchTouchProps {
        x: number,
        y: number
    }
    /**
     * @description 保存图片 兼容Nvue
     */
    interface NvueCanvasConText extends UniApp.CanvasContext {
        toTempFilePath(x: number, y: number, w: number, h: number, dw: number, dh:number, type?: string, quality?: number, callback?: (result: any) => void): void;
    }
    /**
     * @description 保存二维码或者条形码为图片
     * @param id String 保存画布的canvas-id 必传√
     * @param width Number 保存画布的宽度 单位rpx 必传√
     * @param height Number 保存画布的高度 单位rpx 必传√ß
     * @param type String 保存图片的类型 默认 png 非必传
     * @param quality Number 保存图片的质量 默认 1 可选 0～1 非必传
     * @param ctx Object 当前上下文
     */
    interface SaveCanvasPars {
        id: string | UniApp.CanvasContext,
        type?: string,
        width: string | number,
        height: string | number,
        quality?: number,
        ctx: object
    }
}