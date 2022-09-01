import { 三, 五, 七, 正数键值对, 不可能, 空, 是 } from "./number";
import { 构造棋子坐标 } from "./base";
import {
  棋盘行,
  棋盘,
  获取棋盘指定行,
  渲染行内容,
  构造棋盘格,
  初始棋盘格参数,
  棋盘格,
  给棋盘格添加下一格,
  构造棋盘,
  给棋盘行添加下一行,
} from "./biz";

type 五子棋元坐标 =
  | 构造棋子坐标<三, 三>
  | 构造棋子坐标<三, 七>
  | 构造棋子坐标<五, 五>
  | 构造棋子坐标<七, 三>
  | 构造棋子坐标<七, 七>;

type 构造五子棋盘行<
  P extends 棋盘行["上一行"],
  K extends 棋盘行["下一行"]
> = 构造棋盘格<初始棋盘格参数, 空, 空> extends infer 第一格
  ? 第一格 extends 棋盘格
    ? 构造棋盘格<初始棋盘格参数, 第一格, 空> extends infer 第二格
      ? 第二格 extends 棋盘格
        ? 构造棋盘格<初始棋盘格参数, 第二格, 空> extends infer 第三格
          ? 第三格 extends 棋盘格
            ? 构造棋盘格<初始棋盘格参数, 第三格, 空> extends infer 第四格
              ? 第四格 extends 棋盘格
                ? 构造棋盘格<初始棋盘格参数, 第四格, 空> extends infer 第五格
                  ? 第五格 extends 棋盘格
                    ? 构造棋盘格<
                        初始棋盘格参数,
                        第五格,
                        空
                      > extends infer 第六格
                      ? 第六格 extends 棋盘格
                        ? 构造棋盘格<
                            初始棋盘格参数,
                            第六格,
                            空
                          > extends infer 第七格
                          ? 第七格 extends 棋盘格
                            ? 构造棋盘格<
                                初始棋盘格参数,
                                第七格,
                                空
                              > extends infer 第八格
                              ? 第八格 extends 棋盘格
                                ? 构造棋盘格<
                                    初始棋盘格参数,
                                    第八格,
                                    空
                                  > extends infer 第九格
                                  ? 第九格 extends 棋盘格
                                    ? {
                                        内容: 给棋盘格添加下一格<
                                          第一格,
                                          给棋盘格添加下一格<
                                            第二格,
                                            给棋盘格添加下一格<
                                              第三格,
                                              给棋盘格添加下一格<
                                                第四格,
                                                给棋盘格添加下一格<
                                                  第五格,
                                                  给棋盘格添加下一格<
                                                    第六格,
                                                    给棋盘格添加下一格<
                                                      第七格,
                                                      给棋盘格添加下一格<
                                                        第八格,
                                                        给棋盘格添加下一格<
                                                          第九格,
                                                          空
                                                        >
                                                      >
                                                    >
                                                  >
                                                >
                                              >
                                            >
                                          >
                                        >;
                                        上一行: P;
                                        下一行: K;
                                      }
                                    : 不可能
                                  : 不可能
                                : 不可能
                              : 不可能
                            : 不可能
                          : 不可能
                        : 不可能
                      : 不可能
                    : 不可能
                  : 不可能
                : 不可能
              : 不可能
            : 不可能
          : 不可能
        : 不可能
      : 不可能
    : 不可能
  : 不可能;

type 构造五子棋盘 = 构造五子棋盘行<空, 空> extends infer 第一行
  ? 第一行 extends 棋盘行
    ? 构造五子棋盘行<第一行, 空> extends infer 第二行
      ? 第二行 extends 棋盘行
        ? 构造五子棋盘行<第二行, 空> extends infer 第三行
          ? 第三行 extends 棋盘行
            ? 构造五子棋盘行<空, 空> extends infer 第四行
              ? 第四行 extends 棋盘行
                ? 构造五子棋盘行<第一行, 空> extends infer 第五行
                  ? 第五行 extends 棋盘行
                    ? 构造五子棋盘行<第五行, 空> extends infer 第六行
                      ? 第六行 extends 棋盘行
                        ? 构造五子棋盘行<第六行, 空> extends infer 第七行
                          ? 第七行 extends 棋盘行
                            ? 构造五子棋盘行<第七行, 空> extends infer 第八行
                              ? 第八行 extends 棋盘行
                                ? 构造五子棋盘行<
                                    第八行,
                                    空
                                  > extends infer 第九行
                                  ? 第九行 extends 棋盘行
                                    ? 构造棋盘<
                                        {
                                          内容: 给棋盘行添加下一行<
                                            第一行,
                                            给棋盘行添加下一行<
                                              第二行,
                                              给棋盘行添加下一行<
                                                第三行,
                                                给棋盘行添加下一行<
                                                  第四行,
                                                  给棋盘行添加下一行<
                                                    第五行,
                                                    给棋盘行添加下一行<
                                                      第六行,
                                                      给棋盘行添加下一行<
                                                        第七行,
                                                        给棋盘行添加下一行<
                                                          第八行,
                                                          给棋盘行添加下一行<
                                                            第九行,
                                                            空
                                                          >
                                                        >
                                                      >
                                                    >
                                                  >
                                                >
                                              >
                                            >
                                          >;
                                        },
                                        "黑",
                                        空,
                                        是
                                      >
                                    : 不可能
                                  : 不可能
                                : 不可能
                              : 不可能
                            : 不可能
                          : 不可能
                        : 不可能
                      : 不可能
                    : 不可能
                  : 不可能
                : 不可能
              : 不可能
            : 不可能
          : 不可能
        : 不可能
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
          ? `⎪ ${渲染行内容<某行["内容"], 五子棋元坐标, 正数键值对[行]>} ⎪`
          : 不可能
        : 不可能
      : 不可能
    : 不可能;
};

/**
 * @deprecated 构造 9*9 的双向链表会超出 ts 递归次数限制
 */
export type 初始五子棋盘 = 构造五子棋盘;
