import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

interface ISounds {
  sound_type: string;
  is_pause: boolean;
}

export class Sounds extends React.Component<ISounds> {
  public static _common_audio: HTMLAudioElement;
  public static _topad_audio: HTMLAudioElement | null;
  public static _goodjob_audio: HTMLAudioElement | null;
  public static _btn_back_audio: HTMLAudioElement | null;
  public static _btn_tab_audio: HTMLAudioElement | null;
  public static _btn_page_audio: HTMLAudioElement | null;
  public static _group_win: HTMLAudioElement | null;
  public static _write_audio: HTMLAudioElement | null;
  public static _wrong_audio: HTMLAudioElement | null;
  public static _ding_audio: HTMLAudioElement | null;
  public static _correct_audio: HTMLAudioElement | null;
  public static _dingend_audio: HTMLAudioElement | null;

  static pub_initAudio() {
    Sounds._common_audio = document.getElementById(
      "common_audio"
    ) as HTMLAudioElement;

    Sounds._topad_audio = document.getElementById(
      "topad_audio"
    ) as HTMLAudioElement | null;

    Sounds._goodjob_audio = document.getElementById(
      "goodjob_audio"
    ) as HTMLAudioElement | null;

    Sounds._btn_back_audio = document.getElementById(
      "btn_back_audio"
    ) as HTMLAudioElement | null;
    Sounds._btn_tab_audio = document.getElementById(
      "btn_tab_audio"
    ) as HTMLAudioElement | null;

    Sounds._btn_page_audio = document.getElementById(
      "btn_page_audio"
    ) as HTMLAudioElement | null;
    Sounds._group_win = document.getElementById(
      "group_win"
    ) as HTMLAudioElement | null;

    Sounds._write_audio = document.getElementById(
      "write_audio"
    ) as HTMLAudioElement | null;

    Sounds._wrong_audio = document.getElementById(
      "wrong_audio"
    ) as HTMLAudioElement | null;

    Sounds._correct_audio = document.getElementById(
      "correct_audio"
    ) as HTMLAudioElement | null;

    Sounds._ding_audio = document.getElementById(
      "ding_audio"
    ) as HTMLAudioElement | null;
    Sounds._dingend_audio = document.getElementById(
      "dingend_audio"
    ) as HTMLAudioElement | null;
    //console.log("pub_initAudio :: ", document.getElementById("dingend_audio"));
  }
  static pub_playGoodjob() {
    if (Sounds._goodjob_audio) {
      Sounds._goodjob_audio.currentTime = 0;
      Sounds._goodjob_audio.play();
    }
  }
  static pub_playToPad() {
    if (Sounds._topad_audio) {
      Sounds._topad_audio.currentTime = 0;
      Sounds._topad_audio.play();
    }
  }
  static pub_playDing() {
    if (Sounds._ding_audio) {
      Sounds._ding_audio.currentTime = 0;
      Sounds._ding_audio.play();
    }
  }
  static pub_playDingend() {
    if (Sounds._dingend_audio) {
      Sounds._dingend_audio.currentTime = 0;
      Sounds._dingend_audio.play();
    }
  }
  static pub_playClock() {
    if (Sounds._dingend_audio) {
      Sounds._dingend_audio.currentTime = 0;
      Sounds._dingend_audio.play();
    }
  }
  static pub_playBtnTab() {
    if (Sounds._btn_tab_audio) {
      Sounds._btn_tab_audio.currentTime = 0;
      Sounds._btn_tab_audio.play();
    }
  }
  static pub_playWrite() {
    if (Sounds._write_audio) {
      Sounds._write_audio.currentTime = 0;
      Sounds._write_audio.play();
    }
  }
  static pub_playWrong() {
    if (Sounds._wrong_audio) {
      Sounds._wrong_audio.currentTime = 0;
      Sounds._wrong_audio.play();
    }
  }
  static pub_playCorrect() {
    if (Sounds._correct_audio) {
      Sounds._correct_audio.currentTime = 0;
      Sounds._correct_audio.play();
    }
  }
  static pub_playBack() {
    if (Sounds._btn_back_audio) {
      Sounds._btn_back_audio.currentTime = 0;
      Sounds._btn_back_audio.play();
    }
  }

  static pub_stop() {
    if (Sounds._common_audio != undefined) {
      // Sounds._common_audio.onended.call(Sounds._common_audio);
      Sounds._common_audio.oncanplaythrough = null;
      if (
        !isNaN(Sounds._common_audio.duration) &&
        !Sounds._common_audio.paused
      ) {
        Sounds._common_audio.pause();
      }
    }
  }

  static pub_play(url: string, callBack: (isEnded: boolean) => void) {
    Sounds.pub_initAudio();
    Sounds.pub_stop();
    let curSrc = url;
    if (url === "" && curSrc === "") {
      if (callBack != null) callBack(true);
      return;
    }

    if (Sounds._common_audio) {
      if (url !== "") {
        Sounds._common_audio.src = url;
      }
      Sounds._common_audio.onended = e => {
        if (callBack !== null) callBack(e ? true : false);
        Sounds._common_audio.onended = null;
        Sounds._common_audio.onerror = null;
      };
      Sounds._common_audio.onerror = e => {
        if (callBack !== null) callBack(true);
        Sounds._common_audio.onended = null;
        Sounds._common_audio.onerror = null;
      };
      if (isNaN(Sounds._common_audio.duration)) {
        Sounds._common_audio.oncanplaythrough = e => {
          if (Sounds._common_audio.currentTime !== 0) {
            Sounds._common_audio.currentTime = 0;
          }
          Sounds._common_audio.play();
          Sounds._common_audio.oncanplaythrough = null;
        };
        Sounds._common_audio.load();
      } else {
        if (Sounds._common_audio.currentTime !== 0) {
          Sounds._common_audio.currentTime = 0;
        }

        Sounds._common_audio.oncanplaythrough = null;
        Sounds._common_audio.play();
      }
    }
  }
  AppPlay = () => {
    Sounds.pub_initAudio();
    if (this.props.is_pause) {
      Sounds._common_audio.pause();
      Sounds._topad_audio && Sounds._topad_audio.pause()
      Sounds._goodjob_audio && Sounds._goodjob_audio.pause()
    } else {
      switch (this.props.sound_type) {
        case "common":
          Sounds._common_audio.play();
          break;
        case "topad":
          Sounds._topad_audio && Sounds._topad_audio.play()
          break;
        case "goodjob":
          Sounds._goodjob_audio && Sounds._goodjob_audio.play()
        case "btn_back_audio":
          Sounds._btn_back_audio && Sounds._btn_back_audio.play()
          break;
        case "btn_tab_audio":
          Sounds._btn_tab_audio && Sounds._btn_tab_audio.play()
          break;
        case "btn_page_audio":
          Sounds._btn_page_audio && Sounds._btn_page_audio.play()
          break;
        case "group_win":
          Sounds._group_win && Sounds._group_win.play()
          break;
        case "write_audio":
          Sounds._write_audio && Sounds._write_audio.play()
          break;
        case "wrong_audio":
          Sounds._wrong_audio && Sounds._wrong_audio.play()
          break;
        case "ding_audio":
          console.log("???????");
          Sounds._ding_audio && Sounds._ding_audio.play()
          break;
        case "dingend_audio":
          Sounds._dingend_audio && Sounds._dingend_audio.play()
          break;
        default:
          break;
      }
    }
  };
  componentDidMount() {
    this.AppPlay();
  }
  componentDidUpdate() {
    this.AppPlay();
  }
  render() {
    return (
      <div
        ref={() => {
          Sounds.pub_initAudio();
        }}
      />
    );
  }
}
