/* eslint-disable no-unused-vars */
import React, {useReducer} from "react";
import * as _ from "lodash";

import {PenUIReducer} from './MyReducers';

interface IHistory {
  idx: number;
  erase: boolean;
  color: string;
  thick: number;
  path: Path2D;
}

interface ICanvasDraw {
  disable: boolean;
  width: number;
  height: number;
  className: string;
  onDrawStart: (cx: number, cy: number) => number;
  onDrawEnd: () => void;
  onReset?: () => void;
  onUndo?: (idx: number) => void;
}

declare interface IForDraw {
  reset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo(): boolean;
  canRedo(): boolean;
}

// domtoimage types.ts 이미 정의
// declare namespace domtoimage {
//   function toPng(node: Element, options?: {}): Promise<string>;
//   function toSvg(node: Element, options?: {}): Promise<string>;
// }

const initialPenUIState = {
    color: "#000000",
    thick: 5,
    erase: false,
    undoLen: 0,
}

export const CanvasDraw: React.SFC<ICanvasDraw> = ({disable, width, height, className, onDrawStart, onDrawEnd, onReset, onUndo}) => {

    // HTMLCanvasElement: <canvas> 요소 조작하는 여러 프로퍼티와 메서드들을 제공하는 인터페이스.
    let m_canvas;
    let m_pid = -1;
    let m_historys = [];

    const [state, dispatch] = useReducer(PenUIReducer, initialPenUIState);

    function clear() {
        if (!m_canvas) return;
        let ctx = m_canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, m_canvas.width, m_canvas.height);
        while (m_historys.length > 0) m_historys.pop();

        //undoLen이 0일 경우 지우기 및 되돌리기 버튼 비활성화 하기 위함.
        dispatch({type:'setUndoLen', payload: 0});
    }

    function reset() {
        if (!m_canvas) return;
        let ctx = m_canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, m_canvas.width, m_canvas.height);

        while (m_historys.length > 0) m_historys.pop();

        if (onReset) onReset();
        dispatch({type:'setUndoLen', payload: 0});
    }
    function undo() {
        if (!m_canvas) return;

        let ctx = m_canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, m_canvas.width, m_canvas.height);

        if (m_historys.length === 0) return;

        const last = m_historys.pop();

        m_historys.forEach((history) => {
            ctx.strokeStyle = history.color;
            if (history.erase) {
                ctx.globalCompositeOperation = "destination-out";
            } else {
                ctx.globalCompositeOperation = "source-over";
            }
            ctx.lineWidth = history.thick;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke(history.path);
        });

        if (onUndo && last && last.idx >= 0) {
            onUndo(last.idx);
        }
        dispatch({type:'setUndoLen', payload: m_historys.length});
    }
    function redo() {
        //
    }
    const canUndo = () => m_historys.length > 0;
    const canRedo = () => false;

    function _refCanvas(el) {
        if (m_canvas || !el) return;
        m_canvas = el;

        let sx = -100, sy = -100;
        let cx = -100, cy = -100;
        let last_x = 0, last_y = 0;
        let strokeIdx = -1;

        let last = null;
        let ctx = m_canvas.getContext("2d");
        //const peninfo = penInfo;

        // throttle: 지정한 밀리초마다 최대 한 번만 호출된다.(여기서는 18ms마다 최대 한 번 호출됨. 과다한 호출 방지)
        const f_draw = _.throttle(() => {
            ctx.clearRect(0, 0, m_canvas.width, m_canvas.height);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            for (let i = 0, len = m_historys.length; i < len; i++) {
                const hist = m_historys[i];
                ctx.strokeStyle = hist.color;
                if (hist.erase) {
                ctx.globalCompositeOperation = "destination-out";
                } else {
                ctx.globalCompositeOperation = "source-over";
                }
                ctx.lineWidth = hist.thick;
                ctx.stroke(hist.path);
            }

            if (last) {
                ctx.strokeStyle = last.color;
                if (last.erase) {
                ctx.globalCompositeOperation = "destination-out";
                } else {
                ctx.globalCompositeOperation = "source-over";
                }
                ctx.lineWidth = last.thick;
                ctx.stroke(last.path);
            }
        }, 18);

        const f_down = (e) => {
            if (m_pid >= 0 || disable) return;
            m_pid = e.pointerId;
            try {
                m_canvas.setPointerCapture(m_pid);
            } catch (e) {}
            last_x = e.offsetX;
            last_y = e.offsetY;
            cx = e.clientX;
            cy = e.clientY;
            strokeIdx = -1;

            const path = new Path2D();
            last = {
                idx: -1,
                erase: state.erase,
                color: state.color,
                thick: state.erase ? state.thick_erase : state.thick,
                path: path
            };
        };

        const f_move = (e) => {
            if (m_pid !== e.pointerId || !last) return;

            const mx = e.offsetX;
            const my = e.offsetY;
            if (mx === last_x && my === last_y) return;

            const path = last.path;

            if (state.erase) {
                path.moveTo(last_x, last_y);
                path.lineTo(mx, my);
                path.closePath();
                f_draw();

                last_x = mx;
                last_y = my;
            } else {
                if (strokeIdx < 0) {
                strokeIdx = onDrawStart(cx, cy);
                }
                if (strokeIdx >= 0) {
                path.moveTo(last_x, last_y);
                path.lineTo(mx, my);
                path.closePath();
                f_draw();

                last_x = mx;
                last_y = my;
                }
            }
        };

        const f_up = (e) => {
            if (m_pid < 0 || m_pid !== e.pointerId) return;
            try {
                m_canvas.releasePointerCapture(m_pid);
            } catch (e) {}
            m_pid = -1;

            if (last) {
                if (state.erase) {
                    m_historys.push(last);
                    dispatch({type: 'setUndeoLen', payload: m_historys.length});
                } else if (strokeIdx >= 0) {
                    last.idx = strokeIdx;
                    m_historys.push(last);
                    dispatch({type: 'setUndeoLen', payload: m_historys.length});
                    onDrawEnd();
                }
            }
            last = null;
        };
        m_canvas.addEventListener("pointerdown", f_down);
        m_canvas.addEventListener("pointermove", f_move);
        m_canvas.addEventListener("pointerup", f_up);
        m_canvas.addEventListener("pointercancel", f_up);
    };

    return (
        <canvas
            className={className}
            width={width}
            height={height}
            ref={_refCanvas}
            draggable={false}
        />
    );
}
