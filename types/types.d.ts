declare enum ITalkAndSpeakers {
  MINHO,
  YURA,
  ERICK,
  SEUNGYUN,
  ANNA,
  JIEUN
}
declare interface IStudent {
  id: string;
  name: string;
  thumb: string;
  avatar: string;
  nickname: string;
  inited: boolean;
  group?: string | "ga" | "na" | "da" | "ra" | undefined;
  forAni?: number;
  displayMode?: string;
  numOfcurrent?: number;
}
declare interface IReturn extends IStudent {
  rtype: "video" | "image";
  url: string;
  idx: number;
  audioUrl?: Array<string>;
  imageUrl?: string | Array<string>;
  currentIdx?: number;
  imageUrlArr?: Array<string>;
}
declare interface IVocaData1 {
  exp_page: number;
  exp_img: string;
  act_page: number;
  voca: string;
  male: string;
  female: string;
  ext_voca: string;
}
declare interface IVocaData2 {
  ctl_key: string;
  ctl_isOK: boolean;
  ex_mf?: string;
  ex_male?: string;
  ex_female?: string;
  ex_blank_bf?: string;
  ex_exemple_txt?: string;
  ex_blank_txt?: string;
}
declare interface IVocaDatas {
  ex1: IVocaData1[];
  ex2: IVocaData2[];
}
declare interface IVocaData {
  exp_page: number;
  exp_img: string;
  act_page: number;
  voca: string;
  male: string;
  female: string;
  outline: string;
  balloon: string;
  balloon_type: "R" | "L";
  exp_x: number;
  exp_y: number;
  ext_voca: string;
  ctl_key: string;
  ctl_isOK: boolean;
  ex_mf?: string;
  ex_male?: string;
  ex_female?: string;
  ex_blank_bf?: string;
  ex_exemple_txt?: string;
  ex_blank_txt?: string;
}
declare const enum $MSGType {
  OPEN_QUIZ,
  VIEW_CORRECT,
  DRAWING_SEND
}
declare const enum TimeType {
  UNLIMIT,
  ALL,
  PER_QUESTION,
  NONE
}

declare interface IMsg {
  msgtype:
    | $MSGType
    | "send1"
    | "return1"
    | "send2"
    | "return2"
    | "send_answer"
    | "likesoundoff"
    | "jump"
    | "quiz_end"
    | "end_quiz"
    | "likesoundon";
  // 선생이 몇번째 슬라이드 내용을 보냈는지 학생쪽에서 확인하기 위함.
  currentIdx?: number;
  q_result?: boolean[];
  time?: number;
  timeMode?: TimeType;
}

declare interface IVocaExpPage {
  idx: number;
  image: string;
  datas: IVocaData[];
}

declare interface ILikeSetMsg {
  id: string;
  on: boolean;
}

declare type LikeAniType = "love" | "happy" | "normal";
declare interface ILikeSendMsg {
  from: string;
  to: string;
  like: number;
  ani: LikeAniType;
}

declare interface IGroupSelectedMsg {
  ga: string;
  na: string;
  da?: string;
  ra?: string;
}

declare const enum $SocketType {
  PAD_ONSCREEN, // 0
  PAD_START_DIRECTION, // 1
  PAD_LOCATION, // 2
  PAD_END_DIRECTION, // 3
  PAD_INIT_COMPLETE, // 4

  TOP_TITLE_HIDE, // 5
  TOP_TITLE_VIEW, // 6
  TOP_TITLE_SET, // 7
  GOTO_PREV_BOOK, // 8
  GOTO_NEXT_BOOK, // 9

  MSGTOPAD, // 10
  MSGTOTEACHER, // 11
  LIKE_SET, // 12
  LIKE_SEND, // 13
  GROUPING, // 14

  GROUP_SELECTED, // 15
  GROUP_SELECTED_GA,
  GROUP_SELECTED_NA,
  GROUP_SELECTED_DA,
  GROUP_SELECTED_RA,
  GROUP_SELECTED_OTHER,
  GET_NICKNAME,
  START_TIME
}

declare const enum $ReportType {
  DEFAULT = 1,

  TEXT = 2,
  IMAGE = 3,
  AUDIO = 4,
  VIDEO = 5,
  JOIN = 6
}

declare interface IStudent {
  id: string;
  name: string;
  thumb: string;
  avatar: string;
  nickname: string;
  inited: boolean;
  group?: string | "ga" | "na" | "da" | "ra" | undefined;
  groupIdx?: number;
  forAni?: number;
  startTime?: string;
  displayMode?: string;
}

declare interface ISocketData {
  type: $SocketType;
  data: any;
}

declare interface IForDraw {
  reset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo(): boolean;
  canRedo(): boolean;
}

declare namespace domtoimage {
  function toPng(node: Element, options?: {}): Promise<string>;
  function toSvg(node: Element, options?: {}): Promise<string>;
  function toBlob(node: Element, options?: {}): Promise<string>;
}

declare interface IReturnMsg {
  msgtype:
    | $MSGType
    | "send1"
    | "return1"
    | "send2"
    | "return2"
    | "send_answer"
    | "likesoundoff"
    | "jump"
    | "quiz_end"
    | "likesoundon";
  // 선생이 몇번째 슬라이드 내용을 보냈는지 학생쪽에서 확인하기 위함.
  currentIdx?: number;
  q_result?: boolean[];
  time?: number;
  timeMode?: TimeType;
  id?: string;
  video?: string;
  image?: string;
  nickname?: string;
  name?: string;
  thumb?: string;
  avatar?: string;
  displayMode?: string;
  audios?: string;
}
