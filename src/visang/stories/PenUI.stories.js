import React from 'react';

import { PenUI } from '../PenUI';

export default {
  title: 'Visang|PenUI',

  parameters: {
    component: PenUI
  },
};

export const penui = () => (
  <div>
    <PenUI view={true}/>
  </div>
);