import React, {useState, useEffect} from "react";

import { DraggableCore, DraggableData } from "react-draggable";
import * as StrUtil from "../utils/StrUtil";

import { App } from '../App/app';

import "./sendui.scss";

/**
 * 학생 혹은 선생이 상대에게 뭔가를 보낼 때 사용하는 컴포넌트 입니다
 *
 * @param type `pad|teacher` - 선생인지 학생인지
 * @param view - 보여야 하는지 안보여야 하는지
 * @param sended - 이미 보냈는지
 * @param originY `number` - 생성시의 상대 Y좌표인데 사실상 한번도 써본적이 없고 0으로 하고 작업
 * @param onSend - 보내기를 누른 순간에 해야할 callback
 *
 */
export interface IToPad {
  type: "pad" | "teacher";
  view: boolean;
  sended: boolean;
  originY: number;
  hidden?: boolean;
  onSend: () => void;
}

const DUR_FAST = 0.3;
const DUR_SLOW = 0.5;
const MAX = 110;

export function SendUI({type, view, sended, originY, hidden, onSend}: IToPad) {

  let m_btnH = 0;
  let m_max = MAX;
  let m_sy = -1;
  let m_vy = -1;
  let m_time = -1;
  let m_bSend = false;

  //연속클릭방지 변수
  let m_timerId = 0;
  let m_isWheelBlocked = false;

  const initState = {
    y: MAX,
    alpha: 1,
    tDur: 0,
    aDur: 0,
    isOn: false,
    disabled: false
  };
  const [state, setState] = useState(initState)

  useEffect(() => {
    if (sended || !view) return; 
    setState({
        y: originY,
        alpha: 1,
        tDur: DUR_FAST,
        aDur: 0,
        isOn: false,
        disabled: false
    });
  }, []);

  useEffect(() => {
    if (sended) return; 
    setState({
        y: (view) ? originY : m_max,
        alpha: (view) ? 1 : 0,
        tDur: DUR_FAST,
        aDur: (view) ? 0 : DUR_FAST,
        isOn: false,
        disabled: (view) ? false : true
    });
    // if (nextProps.view && !nextProps.sended && !isOn && nextProps.originY !== originY) {
    //   state.y = nextProps.originY;
    //   state.tDur = DUR_FAST;
    //   state.aDur = 0;
    // }
  }, [view, sended, originY]);

  const _ref = (el: HTMLButtonElement | null) => {
    if (!el) return;

    el.setAttribute("touch-action", "none");
    let loop: number = window.setInterval(() => {
      const style = window.getComputedStyle(el);
      const height = StrUtil.nteFloat(style.height, 0);
      const bottom = StrUtil.nteFloat(style.bottom, 0);
      if (height > 0) {
        m_btnH = height;
        m_max = height + bottom + 10;
        if (!view) {
            setState({
                ...state,
                y: m_max,
            });
        }
        window.clearInterval(loop);
      }
    }, 100);
  };

  const _down = (evt: MouseEvent) => {
    if (state.isOn || state.disabled) return;

    setState({
        ...state,
        y: originY,
        alpha: 1,
        tDur: 0,
        aDur: 0,
        isOn: true,
    });

    m_vy = 0;
    m_time = Date.now();
  };

  const _start = (evt: MouseEvent, data: DraggableData) => {
    m_sy = data.y;
    m_bSend = true;
  };

  const _drag = (evt: MouseEvent, data: DraggableData) => {
    if (!state.isOn || state.disabled) return;

    let my = data.y - this.m_sy;

    if (type === "teacher") {
      if (data.deltaY < -1) m_bSend = false;
      else if (data.deltaY >= 0) m_bSend = true;
      if (my < 0) my = 0;
    } else {
      if (data.deltaY > 1) m_bSend = false;
      else if (data.deltaY <= 0) m_bSend = true;

      if (my > 0) my = 0;
    }

    setState({
        ...state,
        y:data.y - m_sy + originY
    });

    const time = Date.now();
    m_vy = data.deltaY / (time - m_time);
    m_time = time;
  };

  const _stop = (evt: MouseEvent, data: DraggableData) => {
    if (!state.isOn || state.disabled) return;

    if (m_bSend) {
      let dy = m_vy * DUR_SLOW * 1000;
      let my = data.y - m_sy;

      if (type === "teacher") {
        if (dy < m_btnH) dy = m_btnH;
        else if (dy > 4 * m_btnH) dy = 4 * m_btnH;

        if (my < 0) my = 0;
      } else {
        if (-1 * dy < m_btnH) dy = -m_btnH;
        else if (-1 * dy > 4 * m_btnH) dy = -4 * m_btnH;
        if (my > 0) my = 0;
      }
        setState({
            ...state,
                y: my + dy + originY,
                alpha: 0,
                tDur: DUR_SLOW,
                aDur: DUR_SLOW,
                isOn: false,
        });

      if (App.isMobile && evt.type === "mouseup") {
        console.log("touch end");
      } else {
        onSend();
      }
    } else {
        setState({
            ...state,
            y: originY,
            alpha: 0,
            tDur: DUR_FAST,
            aDur: 0,
            isOn: false,
        });
    }
  };
 
    const { y, tDur, aDur, alpha, isOn, disabled } = state;

    const style: React.CSSProperties = {
      transform: `translateY(${y}px)`,
      transition: `transform ${tDur}s, opacity ${aDur / 2}s ${aDur / 2}s`,
      opacity: alpha,
      pointerEvents: disabled ? "none" : "auto"
    };

    const arr: string[] = [];
    if (this.props.type === "pad") arr.push("fel_toteacher");
    else arr.push("fel_topad");

    if (isOn) arr.push("on");
    return (
      <DraggableCore
        onMouseDown={this._down}
        onDrag={this._drag}
        onStart={this._start}
        onStop={this._stop}
      >
        <button ref={this._ref} className={arr.join(" ")} style={style} />
      </DraggableCore>
    );
  
}
