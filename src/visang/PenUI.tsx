import React, {useReducer} from 'react';
import PropTypes from 'prop-types';

import {ToggleBtn} from './MyButton';
import "./penui.scss";

import {PenUIReducer} from './MyReducers';

let _draw = null; 

export function setPenDraw(draw) {
  _draw = draw;
}

export interface IPenUI {
  view: boolean;
}

const PenColor = {
  black: "#000000",
  blue: '#1347e9',
  red: '#ec1919',
  green: '#30aa01',
  yellow: '#fddc00',
}

const initialPenUIState = {
  color: "#000000",
  thick: 5,
  erase: false,
  undo_len: 0,
}

export function PenUI({view}) {

    const [state, dispatch] = useReducer(PenUIReducer, initialPenUIState);

    const resetClick = (el) => {
      if (_draw) {
        _draw.reset();
        dispatch({type:'RESET'});
      }
      //Sounds.pub_playBtnTab();
    };
    const undoClick = (el) => {
      if (_draw) {
        _draw.undo();
      }
      //Sounds.pub_playBtnTab();
    };
    const colorClick = (el) => {
      let name = el.currentTarget.name;
      if (!name || name.length !== 10) return;

      dispatch({type:'SET_COLOR', color:"#" + name.substring(4)});
      //Sounds.pub_playBtnTab();
    };
    const eraseClick = (el) => {
      dispatch({type:'SET_ERASE', erase:!state.erase});
      //Sounds.pub_playBtnTab();
    };
    const thickClick = (el) => {
      dispatch({type:'SET_THICK', thick:5});
        //Sounds.pub_playBtnTab();
    };
    const boldThickClick = (el) => {
      dispatch({type:'SET_THICK', thick:10});
        //Sounds.pub_playBtnTab();
    };
    
    const btn_name = penColor => `btn_${penColor.substring(1)}`

    const params = (penColor) => ({
        'name': btn_name(penColor), 
        'disabled': state.erase, 
        'on': (!state.erase && (state.color === penColor)), 
        'onClick': colorClick
    })

    return (
        <div className={view ? "penui on" : "penui"}>
          <div className="pen_color">
            <ToggleBtn {...params(PenColor.black)} />
            <ToggleBtn {...params(PenColor.blue)} />
            <ToggleBtn {...params(PenColor.red)} />
            <ToggleBtn {...params(PenColor.green)} />
            <ToggleBtn {...params(PenColor.yellow)} />
          </div>
          <div className="pen_select">
            <ToggleBtn name="pen_icon" on={!state.erase && state.thick === 5} onClick={thickClick} />
            <ToggleBtn name="pen_thick" on={!state.erase && state.thick === 10} onClick={boldThickClick} />
          </div>
          <div className="pen_button">
            <ToggleBtn name="btn_eraser" disabled={state.undoLen === 0} on={state.erase} onClick={eraseClick} />
            <ToggleBtn name="btn_undo" disabled={state.undoLen === 0} onClick={undoClick} />
            <ToggleBtn name="btn_reset" onClick={resetClick} />
          </div>
        </div>
      );
}

PenUI.PropType = {
    view: PropTypes.bool,
}

PenUI.defaultProps = {
  view: true
}