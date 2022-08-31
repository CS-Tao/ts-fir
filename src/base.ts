/**
 * 基础类型
 */
type 不可能 = never;
type 空 = undefined;
type 是 = true;
type 否 = false;

/**
 * 整数相关的定义
 */
type 零 = {
  是零吗: 是;
};

type 加一<T extends 整数> = {
  前一个数: T;
  是零吗: 否;
};

type 正数 = { 前一个数: 整数; 是零吗: 否 };

type 整数 = 零 | 正数;

type 减一<某个数 extends 整数> = 某个数 extends 加一<infer 前一个数>
  ? 前一个数
  : 不可能;

type 一 = 加一<零>;
type 二 = 加一<一>;
type 三 = 加一<二>;
type 四 = 加一<三>;
type 五 = 加一<四>;
type 六 = 加一<五>;
type 七 = 加一<六>;
type 八 = 加一<七>;
type 九 = 加一<八>;

/**
 * 偏序比较运算
 */
type 相等<第一个数 extends 整数, 第二个数 extends 整数> = 第一个数 extends 零
  ? 第二个数 extends 零
    ? 是
    : 否
  : 第二个数 extends 零
  ? 否
  : 相等<减一<第一个数>, 减一<第二个数>>;

type 不相等<第一个数 extends 整数, 第二个数 extends 整数> = 相等<
  第一个数,
  第二个数
> extends 是
  ? 否
  : 是;

type 大于<第一个数 extends 整数, 第二个数 extends 整数> = 第一个数 extends 零
  ? 否
  : 第二个数 extends 零
  ? 是
  : 大于<减一<第一个数>, 减一<第二个数>>;

type 小于<第一个数 extends 整数, 第二个数 extends 整数> = 第一个数 extends 零
  ? 第二个数 extends 零
    ? 否
    : 是
  : 第二个数 extends 零
  ? 否
  : 小于<减一<第一个数>, 减一<第二个数>>;

type 大于等于<第一个数 extends 整数, 第二个数 extends 整数> = 是 extends 相等<
  第一个数,
  第二个数
>
  ? 是
  : 大于<第一个数, 第二个数>;

type 小于等于<第一个数 extends 整数, 第二个数 extends 整数> = 是 extends 相等<
  第一个数,
  第二个数
>
  ? 是
  : 小于<第一个数, 第二个数>;

type 将两个整数从小到大排序<数组> = 数组 extends [infer 整数1, infer 整数2]
  ? 整数1 extends 整数
    ? 整数2 extends 整数
      ? 是 extends 大于<整数1, 整数2>
        ? [整数2, 整数1]
        : [整数1, 整数2]
      : 不可能
    : 不可能
  : 不可能;

type 数字键值对 = {
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

type 正数键值对 = Omit<数字键值对, "零">;
