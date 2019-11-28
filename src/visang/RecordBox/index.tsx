import React, {useState, useEffect} from "react";
import { ToggleBtn, AudioBtn } from '../MyButton';
import { Sounds } from "../Sounds";

import { SEND_PROG, RECORD_PROG } from "../interface";

//import { App } from "@commonNew/App";
import "./record.scss";

export interface IRecordBox {
    view: boolean;
    RecordProg: RECORD_PROG;
    sendedProg: SEND_PROG;
    currentIdx: number;
    data: Array<any>;
    recordLimit?: number;
    clickRecord: () => void;
    isPlaying?: (v: boolean) => void;
}

let RECORD_LIMIT = 30;

export const RecordBox = ({view, RecordProg, sendedProg, clickRecord, data, currentIdx, recordLimit, isPlaying}: IRecordBox) => { // <T> extends ToggleBtn<T & IRecordBox> {
  
    const [isTimeOver, setIsTimeOver] = useState(false);

    let m_start = 0;

    // 기본적인 제한시간을 30초로 설정
    const [countdown, setCountdown] = useState(RECORD_LIMIT);
    let m_RECORD_LIMIT = RECORD_LIMIT;

    const _countDown = (t: number) => {
        if (RecordProg !== RECORD_PROG.RECORDING) return;
        let runTime = Math.floor((Date.now() - m_start) / 1000);
        if (runTime >= m_RECORD_LIMIT) {
            setIsTimeOver(true);
            setCountdown(0);
            clickRecord();
            return;
        } else { 
            setCountdown(m_RECORD_LIMIT - runTime);
        }
    };
    window.requestAnimationFrame(_countDown);

    useEffect(() => {
        if (RecordProg === RECORD_PROG.RECORDING) {
            m_start = Date.now();
            setCountdown(m_RECORD_LIMIT);
            window.requestAnimationFrame(_countDown);
        } else if (RecordProg < RECORD_PROG.RECORDING) {
            setCountdown(m_RECORD_LIMIT);
        }
        
        // receive props
        if (m_RECORD_LIMIT !== 0) {
            setCountdown(m_RECORD_LIMIT)
        }
        if (recordLimit) {
            // props가 있으면 레코드 제한시간을 그 props를 따라가게 함
            m_RECORD_LIMIT = recordLimit;
            setCountdown(recordLimit);
        }
    },[RecordProg, recordLimit]);

    const style: React.CSSProperties = {};

    let recorded = "";
    if (view) {
        const idx = currentIdx ? currentIdx : 0;
        (data.length != 0) && (recorded = data[idx] as string)

        let infoClass = "";
        let infoTxt = <></>;

        if (RecordProg >= RECORD_PROG.WAIT_RECORD_START && RecordProg < RECORD_PROG.WAIT_RECORDED) {
            infoClass = " recording";
            recorded = "";
            infoTxt = <span>{_toTime(countdown)}</span>;
        } else if (RecordProg >= RECORD_PROG.WAIT_RECORDED) {
            infoClass = " recorded";
            infoTxt = <span />;
        }

        return (
            <div className={"record_box"}>
                <div className="line" />
                <div className={"info" + infoClass}>
                    <div className={"recordWave" + (RecordProg > RECORD_PROG.INIT && RecordProg < RECORD_PROG.WAIT_RECORDED && sendedProg < SEND_PROG.SENDING ? " on" : "")}>
                    {infoTxt}
                    </div>
                </div>
                <div>
                    <ToggleBtn name="btn_record"
                        on={RecordProg === RECORD_PROG.WAIT_RECORD_START || RecordProg === RECORD_PROG.RECORDING}
                        disabled={RecordProg === RECORD_PROG.WAIT_RECORDED || sendedProg >= SEND_PROG.SENDING}
                        onClick={clickRecord}
                    />
                    <audio src={""} controls={false} id="common_audio" preload="true" />
                    <AudioBtn name="btn_play"  src={recorded}  playFnc={Sounds.pub_play} pauseFnc={Sounds.pub_stop} preventEvent={true}
                        disabled={(RecordProg < RECORD_PROG.WAIT_RECORDED && recorded === "") || RecordProg == RECORD_PROG.RECORDING}
                    ref={ el => { (isPlaying && el) && isPlaying(el.m_on); }}
                    />
                </div>
        </div>
    );
    }
        
    style.pointerEvents = "none";
    style.opacity = 0;
    style.zIndex = -1;

    return <></>;
        
}

function _toTime(t: number) {
  let ret;
  if (t >= 60) {
    const sec = t % 60;
    const min = Math.floor(t / 60);
    if (min >= 10) ret = min + "";
    else ret = "0" + min;

    if (sec >= 10) ret = ret + ":" + sec + "";
    else ret = ret + ":0" + sec;
  } else if (t >= 10) ret = "00:" + t;
  else ret = "00:0" + t;
  return ret;
}

RecordBox.prototype = {
/**
 * 음성녹음
 *
 * @param RecordProg `INIT,WAIT_RECORD_START,RECORDING,WAIT_RECORDED,RECORDED` - 현재 레코딩 단계
 * @param sendedProg - 학생이 선생에게 결과를 보내면 녹음이 다신 안되어야 하므로 보낸 여부 담아두기
 * @param currentIdx - 녹음하고 있는 페이지이가 몇 페이지거의 녹음기록인지 알 수 있도록 처리
 * @param data - 연속적으로 여러번 녹음해야 할 때가 있는데 이 때 순서에 맞게 배열에 넣게 되는데 그 때 쓰이는 배열
 * @param recordLimit - 제한시간
 * @param clickRecord - 레코드 버튼을 눌렀을 때의 callback
 *
 */
}