type 黑色符号 = "🔴";
type 白色符号 = "🟢";
type 空符号 = "➕";
type 元符号 = "＋";

type 黑色 = "黑";
type 白色 = "白";

type 颜色 = 黑色 | 白色;

type 棋子<T extends 颜色> = {
  符号: T extends 黑色 ? 黑色符号 : 白色符号;
};

type 棋盘格 = {
  内容: 棋子<颜色> | 空;
  下一格: 棋盘格 | 空;
};

type 构造棋盘格参数 = {
  内容: 棋盘格["内容"];
};

type 构造棋盘格<T extends 构造棋盘格参数, P extends 棋盘格["下一格"]> = {
  内容: T["内容"];
  下一格: P;
};

type 从内容构造棋盘格<T extends 棋盘格["内容"], P extends 棋盘格["下一格"]> = {
  内容: T;
  下一格: P;
};

type 棋盘行 = {
  内容: 棋盘格;
  下一行: 棋盘行 | 空;
};

type 构造棋盘行参数 = {
  内容: 构造棋盘格参数;
};

type 构造棋盘行<T extends 构造棋盘行参数, P extends 棋盘行["下一行"]> = {
  内容: T["内容"];
  下一行: P;
};

type 从内容构造棋盘行<T extends 棋盘行["内容"], P extends 棋盘行["下一行"]> = {
  内容: T;
  下一行: P;
};

type 棋盘 = {
  内容: 棋盘行;
  待落颜色: 颜色;
};

type 构造棋盘参数 = {
  内容: 棋盘行;
};

type 构造棋盘<T extends 构造棋盘参数, P extends 颜色> = {
  内容: T["内容"];
  待落颜色: P;
};

/**
 * 在链表中获取指定行号的一行
 */
type 根据链表获取棋盘指定行<
  行链表 extends 棋盘行 | 空,
  行号 extends 棋子纵坐标 | 零
> = 行链表 extends 棋盘行
  ? 是 extends 相等<行号, 最小纵坐标>
    ? 行链表
    : 根据链表获取棋盘指定行<行链表["下一行"], 减一<行号>>
  : 不可能;

type 获取棋盘指定行<
  某棋盘 extends 棋盘,
  行号 extends 棋子纵坐标
> = 根据链表获取棋盘指定行<某棋盘["内容"], 行号>;

/**
 * 在链表中获取指定列号的一个单元格
 */
type 根据链表获取棋盘某行的指定单元格<
  单元链表 extends 棋盘格 | 空,
  列号 extends 棋子横坐标 | 零
> = 单元链表 extends 棋盘格
  ? 是 extends 相等<列号, 最小横坐标>
    ? 单元链表
    : 根据链表获取棋盘某行的指定单元格<单元链表["下一格"], 减一<列号>>
  : 不可能;

type 获取某行的指定单元格<
  某行 extends 棋盘行,
  列号 extends 棋子横坐标
> = 根据链表获取棋盘某行的指定单元格<某行["内容"], 列号>;

/**
 * 获取单元格内容
 */
type 获取某个单元内容<某单元 extends 棋盘格> = 某单元["内容"];

/**
 * 获取棋盘某位置的棋子
 */
type 获取棋盘某位置的单元<
  某棋盘 extends 棋盘,
  某位置 extends 棋子坐标
> = 获取棋盘指定行<某棋盘, 某位置["纵"]> extends infer 某行
  ? 某行 extends 棋盘行
    ? 获取某行的指定单元格<某行, 某位置["横"]>
    : 不可能
  : 不可能;

type 替换棋盘某行<
  某棋盘 extends 棋盘,
  行号 extends 棋子坐标["纵"],
  新行 extends 棋盘行,
  迭代次数 extends 整数 = 最小纵坐标
> = 迭代次数 extends infer 校验后的迭代数
  ? 校验后的迭代数 extends 棋子坐标["纵"]
    ? 小于等于<迭代次数, 最大纵坐标> extends 是
      ? 获取棋盘指定行<某棋盘, 校验后的迭代数> extends infer 当前行
        ? 当前行 extends 棋盘行
          ? 相等<迭代次数, 行号> extends 是
            ? 构造棋盘行<{ 内容: 新行["内容"] }, 当前行["下一行"]>
            : 构造棋盘行<
                { 内容: 当前行["内容"] },
                替换棋盘某行<某棋盘, 行号, 新行, 加一<校验后的迭代数>>
              >
          : 不可能
        : 不可能
      : 不可能
    : 不可能
  : 不可能;

type 替换棋盘行某格<
  某行 extends 棋盘行,
  列号 extends 棋子坐标["横"],
  某棋子 extends 棋子<颜色>,
  迭代次数 extends 整数 = 最小横坐标
> = 迭代次数 extends infer 校验后的迭代数
  ? 校验后的迭代数 extends 棋子坐标["横"]
    ? 小于等于<迭代次数, 最大横坐标> extends 是
      ? 获取某行的指定单元格<某行, 校验后的迭代数> extends infer 当前格
        ? 当前格 extends 棋盘格
          ? 相等<迭代次数, 列号> extends 是
            ? 从内容构造棋盘格<某棋子, 当前格["下一格"]>
            : 从内容构造棋盘格<
                当前格["内容"],
                替换棋盘行某格<某行, 列号, 某棋子, 加一<校验后的迭代数>>
              >
          : 不可能
        : 不可能
      : 不可能
    : 不可能
  : 不可能;

type 构造五子棋棋盘行参数 = [
  构造棋盘格参数,
  构造棋盘格参数,
  构造棋盘格参数,
  构造棋盘格参数,
  构造棋盘格参数,
  构造棋盘格参数,
  构造棋盘格参数,
  构造棋盘格参数,
  构造棋盘格参数
];

type 构造五子棋棋盘行<
  T extends 构造五子棋棋盘行参数,
  P extends 棋盘行["下一行"]
> = T extends [
  infer 第一格 extends 构造棋盘格参数,
  infer 第二格 extends 构造棋盘格参数,
  infer 第三格 extends 构造棋盘格参数,
  infer 第四格 extends 构造棋盘格参数,
  infer 第五格 extends 构造棋盘格参数,
  infer 第六格 extends 构造棋盘格参数,
  infer 第七格 extends 构造棋盘格参数,
  infer 第八格 extends 构造棋盘格参数,
  infer 第九格 extends 构造棋盘格参数
]
  ? 构造棋盘行<
      {
        内容: 构造棋盘格<
          第一格,
          构造棋盘格<
            第二格,
            构造棋盘格<
              第三格,
              构造棋盘格<
                第四格,
                构造棋盘格<
                  第五格,
                  构造棋盘格<
                    第六格,
                    构造棋盘格<
                      第七格,
                      构造棋盘格<第八格, 构造棋盘格<第九格, 空>>
                    >
                  >
                >
              >
            >
          >
        >;
      },
      P
    >
  : 不可能;

type 构造五子棋棋盘参数 = [
  构造五子棋棋盘行参数,
  构造五子棋棋盘行参数,
  构造五子棋棋盘行参数,
  构造五子棋棋盘行参数,
  构造五子棋棋盘行参数,
  构造五子棋棋盘行参数,
  构造五子棋棋盘行参数,
  构造五子棋棋盘行参数,
  构造五子棋棋盘行参数
];

type 构造五子棋棋盘<T extends 构造五子棋棋盘参数> = T extends [
  infer 第一行 extends 构造五子棋棋盘行参数,
  infer 第二行 extends 构造五子棋棋盘行参数,
  infer 第三行 extends 构造五子棋棋盘行参数,
  infer 第四行 extends 构造五子棋棋盘行参数,
  infer 第五行 extends 构造五子棋棋盘行参数,
  infer 第六行 extends 构造五子棋棋盘行参数,
  infer 第七行 extends 构造五子棋棋盘行参数,
  infer 第八行 extends 构造五子棋棋盘行参数,
  infer 第九行 extends 构造五子棋棋盘行参数
]
  ? 构造棋盘<
      {
        内容: 构造五子棋棋盘行<
          第一行,
          构造五子棋棋盘行<
            第二行,
            构造五子棋棋盘行<
              第三行,
              构造五子棋棋盘行<
                第四行,
                构造五子棋棋盘行<
                  第五行,
                  构造五子棋棋盘行<
                    第六行,
                    构造五子棋棋盘行<
                      第七行,
                      构造五子棋棋盘行<第八行, 构造五子棋棋盘行<第九行, 空>>
                    >
                  >
                >
              >
            >
          >
        >;
      },
      "黑"
    >
  : 不可能;

export type 落子<
  某棋盘 extends 棋盘,
  某颜色 extends 颜色,
  横坐标 extends 棋子横坐标,
  纵坐标 extends 棋子纵坐标
> = 构造棋子坐标<横坐标, 纵坐标> extends infer 某坐标
  ? 某坐标 extends 棋子坐标
    ? 某颜色 extends infer 当前颜色
      ? 当前颜色 extends 某棋盘["待落颜色"]
        ? 获取棋盘某位置的单元<某棋盘, 某坐标> extends infer 当前格
          ? 当前格 extends 棋盘格
            ? 当前格["内容"] extends 空
              ? 获取棋盘指定行<某棋盘, 某坐标["纵"]> extends infer 当前行
                ? 当前行 extends 棋盘行
                  ? 构造棋盘<
                      {
                        内容: 替换棋盘某行<
                          某棋盘,
                          某坐标["纵"],
                          从内容构造棋盘行<
                            替换棋盘行某格<当前行, 某坐标["横"], 棋子<某颜色>>,
                            当前行["下一行"]
                          >
                        >;
                      },
                      当前颜色 extends "黑" ? "白" : "黑"
                    >
                  : 不可能
                : 不可能
              : 不可能
            : 不可能
          : 不可能
        : 不可能
      : 不可能
    : 不可能
  : 不可能;

type 元坐标 =
  | 构造棋子坐标<三, 三>
  | 构造棋子坐标<三, 七>
  | 构造棋子坐标<五, 五>
  | 构造棋子坐标<七, 三>
  | 构造棋子坐标<七, 七>;

type 渲染空格<
  纵坐标 extends 棋子纵坐标,
  横坐标 extends 棋子横坐标
> = 构造棋子坐标<横坐标, 纵坐标> extends 元坐标 ? 元符号 : 空符号;

type 渲染格<
  某格 extends 棋盘格,
  纵坐标 extends 棋子纵坐标,
  横坐标 extends 棋子横坐标
> = 某格["内容"] extends infer 待渲染棋子
  ? 待渲染棋子 extends 棋子<颜色>
    ? 待渲染棋子 extends 棋子<黑色>
      ? 棋子<黑色>["符号"]
      : 棋子<白色>["符号"]
    : 待渲染棋子 extends 空
    ? 渲染空格<横坐标, 纵坐标>
    : 不可能
  : 不可能;

type 拼接单元格<
  迭代结果 extends string,
  当前结果 extends string
> = 迭代结果 extends "" ? 当前结果 : `${迭代结果} ${当前结果}`;

type 渲染行内容<
  某格 extends 棋盘格 | 空,
  纵坐标 extends 棋子纵坐标,
  迭代结果 extends string = "",
  迭代号 extends 整数 = 最小横坐标
> = 某格 extends infer 当前格
  ? 迭代号 extends infer 横坐标
    ? 当前格 extends 棋盘格
      ? 横坐标 extends 棋子横坐标
        ? 渲染行内容<
            当前格["下一格"],
            纵坐标,
            拼接单元格<迭代结果, 渲染格<当前格, 纵坐标, 横坐标>>,
            加一<迭代号>
          >
        : 迭代结果
      : 当前格 extends 空
      ? 迭代结果
      : 不可能
    : 不可能
  : 不可能;

export type 渲染棋盘<某棋盘 extends 棋盘> = {
  [key in
    | "一"
    | "二"
    | "三"
    | "四"
    | "五"
    | "六"
    | "七"
    | "八"
    | "九"]: key extends infer 行
    ? 行 extends "上"
      ? " ⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽ "
      : 行 extends "下"
      ? " ⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺ "
      : 行 extends keyof 正数键值对
      ? 获取棋盘指定行<某棋盘, 正数键值对[行]> extends infer 某行
        ? 某行 extends 棋盘行
          ? `⎪ ${渲染行内容<某行["内容"], 正数键值对[行]>} ⎪`
          : 不可能
        : 不可能
      : 不可能
    : 不可能;
};

type 初始棋盘格参数 = {
  内容: 空;
};

type 初始棋盘行参数 = [
  初始棋盘格参数,
  初始棋盘格参数,
  初始棋盘格参数,
  初始棋盘格参数,
  初始棋盘格参数,
  初始棋盘格参数,
  初始棋盘格参数,
  初始棋盘格参数,
  初始棋盘格参数
];

type 初始棋盘参数 = [
  初始棋盘行参数,
  初始棋盘行参数,
  初始棋盘行参数,
  初始棋盘行参数,
  初始棋盘行参数,
  初始棋盘行参数,
  初始棋盘行参数,
  初始棋盘行参数,
  初始棋盘行参数
];

export type 初始棋盘 = 构造五子棋棋盘<初始棋盘参数>;