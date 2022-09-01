/**
 * 基础类型
 */
export type 不可能 = never;
export type 空 = undefined;
export type 是 = true;
export type 否 = false;

/**
 * 整数相关的定义
 */
export type 零 = {
  是零吗: 是;
};

export type 加一<T extends 整数> = {
  前一个数: T;
  是零吗: 否;
};

export type 正数 = { 前一个数: 整数; 是零吗: 否 };

export type 整数 = 零 | 正数;

export type 减一<某个数 extends 整数> = 某个数 extends 加一<infer 前一个数>
  ? 前一个数
  : 不可能;

export type 一 = 加一<零>;
export type 二 = 加一<一>;
export type 三 = 加一<二>;
export type 四 = 加一<三>;
export type 五 = 加一<四>;
export type 六 = 加一<五>;
export type 七 = 加一<六>;
export type 八 = 加一<七>;
export type 九 = 加一<八>;

/**
 * 偏序比较运算
 */
export type 相等<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 第一个数 extends 零
  ? 第二个数 extends 零
    ? 是
    : 否
  : 第二个数 extends 零
  ? 否
  : 相等<减一<第一个数>, 减一<第二个数>>;

export type 不相等<第一个数 extends 整数, 第二个数 extends 整数> = 相等<
  第一个数,
  第二个数
> extends 是
  ? 否
  : 是;

export type 大于<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 第一个数 extends 零
  ? 否
  : 第二个数 extends 零
  ? 是
  : 大于<减一<第一个数>, 减一<第二个数>>;

export type 小于<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 第一个数 extends 零
  ? 第二个数 extends 零
    ? 否
    : 是
  : 第二个数 extends 零
  ? 否
  : 小于<减一<第一个数>, 减一<第二个数>>;

export type 大于等于<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 是 extends 相等<第一个数, 第二个数> ? 是 : 大于<第一个数, 第二个数>;

export type 小于等于<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 是 extends 相等<第一个数, 第二个数> ? 是 : 小于<第一个数, 第二个数>;

export type 将两个整数从小到大排序<数组> = 数组 extends [
  infer 整数1,
  infer 整数2
]
  ? 整数1 extends 整数
    ? 整数2 extends 整数
      ? 是 extends 大于<整数1, 整数2>
        ? [整数2, 整数1]
        : [整数1, 整数2]
      : 不可能
    : 不可能
  : 不可能;

export type 数字键值对 = {
  零: 零;
  一: 一;
  二: 二;
  三: 三;
  四: 四;
  五: 五;
  六: 六;
  七: 七;
  八: 八;
  九: 九;
};

export type 正数键值对 = Omit<数字键值对, "零">;

export type 渲染数字<数字 extends 正数> =
  keyof 数字键值对 extends infer 数字字符串
    ? 数字字符串 extends keyof 数字键值对
      ? 数字 extends 数字键值对[数字字符串]
        ? 数字字符串
        : 不可能
      : 不可能
    : 不可能;
