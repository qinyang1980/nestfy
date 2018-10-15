import { InternalServerError } from '../../../candy';

/**
 * @author hai.zhang
 * @param code
 * @description 错误码配置
 */
const errors = {
  // HTTP
  '200': 'OK',

  // -1000 ~ -1200
  '-1000': '数据库连接失败！',
  '-1001': 'SQL语法错误！',
  '-1002': '数据库 - 无法查找到数据！',
  '-1003': '数据库 - ID重复',
  '-1004': '数据库 - 手机号码重复',
  '-1005': '输入的ID无效，查询不到相关数据！',

  // -1300 ~ -1400
  '-1300': '签名不正确！',
  '-1301': '此订单已经处理过！',
  '-1302': 'optional参数错误！',
  '-1303': '订单的金额不符！',
  '-1304': '必须提供token',
  '-1305': 'token验证失败',
  '-1306': 'token超时错误',
  '-1307': '优惠券金额不足',
  '-1308': '优惠券次数不足',
  '-1309': '优惠券还不可以使用',
  '-1310': '优惠券已过期',
  '-1311': 'transactionId错误',
  '-1312': 'optional.flag错误',

  // -1500 ~ -1600
  '-1500': '账号不存在',
  '-1501': '密码与账号不符',
  '-1502': '手机号或验证码有误',
  '-1503': '账号已存在',
  '-1504': '手机验证码校验失败，验证码错误！',
  '-1505': '验证码校验失败，验证码超时！',
  '-1506': '图片解析失败',
  '-1507': '密码错误！',
  '-1508': '无法获取用户对应的角色信息！用户信息创建有误！',
  '-1509': '检测出你属于平台用户，但是移动平台不支持你的系统角色！',
  '-1510': '该用户已经登陆过（绑定成功），无需再次绑定！',
  '-1511': '参数有误',
  '-1512': '医生不存在',
  '-1513': '患者不存在',
  '-1514': '角色不存在',
  '-1515': '角色不符', // 患者不能登录pc端系统
  '-1516': '模板命名重复，请重新命名', // 模板命名重复
  '-1517': '问诊不存在或状态错误', // 问诊状态或问诊ID错误
  '-1518': '手机号已占用',
  '-1519': '该平台已占用',

  // -1700 ~ -1800
  '-1700': '同步错误 - 无法识别传入的资源类型！',
  '-1701': '不可提交',
  '-1702': '传参错误',
  '-1703': '没有病人在排队',
  '-1704': 'QueryInfo参数错误',
  '-1705': '专家离线中，不可进入诊室',

  '-2000': '订单无效,请发起新问诊',
  '-2001': '订单状态有误',
  '-2002': '订单失效',

  // -5000
  '-5000': '未知错误'
};

export const error = {
  error(code: any): Error {
    code = `${code}`;
    if (!Reflect.has(errors, code)) {
      code = '-5000';
    }
    const msg = errors[code];
    const ise = new InternalServerError(msg);
    (ise as any).errno = code;
    return ise;
  }
};
