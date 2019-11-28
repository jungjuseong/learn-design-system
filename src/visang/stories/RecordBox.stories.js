import React from 'react';

import { RecordBox } from '../RecordBox';
import {RECORD_PROG, SEND_PROG} from '../interface'

export default {
  title: 'Visang|RecordBox',

  parameters: {
    component: RecordBox
  },
};

const params = {
  view: true,
  RecordProg: RECORD_PROG.INIT,
  sendProg: SEND_PROG.HIDE,
  currentIdx: 0,
  data:[],
  clickRecord: () => {},
}

export const start = () => (
  <div>
    <RecordBox {...params} />
  </div>
);