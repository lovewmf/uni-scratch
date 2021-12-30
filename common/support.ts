
/**
 * @author wmf❤洛尘
 * @method UNIT_CONVERSION
 * @description UniApp rpx ——> px 默认750
 * @param num 
 * @returns 转换后的像素
 */
export const UNIT_CONVERSION = function (num: string | number): number{
	return uni.upx2px(Number(num));
}
/**
 * @author wmf❤洛尘
 * @method getPixelRatio
 * @description 获取设备像素比 获取系统信息同步接口。
 * @returns num Number/String
 */
 export const getPixelRatio = function(name?: string): string | number {
    const res = uni.getSystemInfoSync();
    return res[name || 'pixelRatio']
 }
/**
 * @author wmf❤洛尘
 * @method getTimeDate
 * @description 获取当前日期
 * @returns YY-MM-DD HH:hh:mm
 */
export const getTimeDate = function(): string {
   const date: Date = new Date();
   const year: string = date.toLocaleDateString().replace(/\//g,'-');
   const hour: string = date.toTimeString().slice(0,8);
   return `${year} ${hour}`
}
type sizeGroup = 'none' | 'NVUE' | 'APP-PLUS' |'H5'| 'MP' | 'MP-ALIPAY' | 'MP-WEIXIN' | 'MP-BAIDU' | 'MP-TOUTIAO' | 'MP-LARK' | 'MP-QQ' | 'MP-KUAISHOU' | 'MP-360' | 'QUICKAPP-WEBVIEW' | 'QUICKAPP-WEBVIEW-UNION' | 'QUICKAPP-WEBVIEW-HUAWEI';
interface SizeTypeValue {
    (size: string | number): number
}
type SizeType = Record<sizeGroup, SizeTypeValue>
export const GETSIZE: SizeType = {
    // 支付宝小程序
    'MP-ALIPAY': function (size: string | number): number {
        return UNIT_CONVERSION(size) * (getPixelRatio() as number)
    },
    // 微信小程序
    'MP-WEIXIN': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // 百度小程序
    'MP-BAIDU': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // 字节小程序
    'MP-TOUTIAO': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // QQ小程序
    'MP-QQ': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // 飞书小程序
    'MP-LARK': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // 快手小程序
    'MP-KUAISHOU': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // 360小程序
    'MP-360': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // 快应用通用(包含联盟、华为)
    'QUICKAPP-WEBVIEW': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // 快应用联盟
    'QUICKAPP-WEBVIEW-UNION': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // 快应用华为
    'QUICKAPP-WEBVIEW-HUAWEI': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
     // 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/飞书小程序/QQ小程序/360小程序
    'MP': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // App
    'APP-PLUS': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // App nvue
    'NVUE': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    // H5
    'H5': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    },
    'none': function (size: string | number): number {
        return UNIT_CONVERSION(size)  as number
    }
}
/**
 * @author wmf❤洛尘
 * @method SaveCodeImg
 * @description 保存二维码或者条形码为图片
 * @param k 
 * @returns 
 */
export const SaveImg = function(k: StrongCode.SaveCanvasPars): object{
    const width: number = UNIT_CONVERSION(Number(k.width));
    const height: number = UNIT_CONVERSION(Number(k.height));
    const pixelRatio: number = getPixelRatio('pixelRatio') as  number;
    const destWidth: number = width * pixelRatio;
    const destHeight: number = height * pixelRatio;
    return new Promise((resolve)=>{
        if (Object.prototype.toString.call(k.id) == '[object String]') {
            uni.canvasToTempFilePath({
                canvasId: k.id as string,
                width: width,
                height: height,
                destWidth: destWidth,
                destHeight: destHeight,
                fileType: k.type || 'jpg',
                quality: k.quality || 1,
                complete: function(res) {
                    resolve(res)
                }
            }, k.ctx)
        } else if (Object.prototype.toString.call(k.id) == '[object Object]') {//兼容nvue
            const ctx = k.id as StrongCode.NvueCanvasConText;
            ctx.toTempFilePath(0, 0, width, height, destWidth, destHeight, k.type || 'png', 1,(res)=> {
                resolve(res)
            })
        }
    })
}