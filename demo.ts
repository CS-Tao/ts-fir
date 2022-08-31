import { 初始棋盘, 渲染棋盘, 落子 } from "./src/index";

type 初始结果 = 渲染棋盘<初始棋盘>;

type 黑第一步 = 落子<初始棋盘, "黑", 二, 三>;
type 黑第一步结果 = 渲染棋盘<黑第一步>;

type 白第一步 = 落子<黑第一步, "白", 三, 三>;
type 白第一步结果 = 渲染棋盘<白第一步>;

type 黑第二步 = 落子<白第一步, "黑", 三, 四>;
type 黑第二步结果 = 渲染棋盘<黑第二步>;
