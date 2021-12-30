/**
* @author wmf❤洛尘
* @version 1.0.0
* @Date 2021-11-08
* @LastEditTime 2021-11-08
* @description UniApp 刮奖
* @description “仓廪实而知礼节，衣食足而知荣辱。”礼生於有而废於无。故君子富，好行其德；小人富，以适其力。渊深而鱼生之，山深而兽往之，人富而仁义附焉。富者得埶益彰，失埶则客无所之，以而不乐。夷狄益甚。谚曰：“千金之子，不死於市。”此非空言也。故曰：“天下熙熙，皆为利来；天下攘攘，皆为利往。
* */
import { WidgetScratch } from './lib/scratch'
import { SaveImg, getPixelRatio, UNIT_CONVERSION } from './common/support'

// 刮刮乐
export const Scratch = WidgetScratch;

// 获取条形码或者二维码图片
export const GetImg = SaveImg;

// 获取设备信息
export const GetPixelRatio = getPixelRatio;

// rpx=>px
export const GetPx = UNIT_CONVERSION;