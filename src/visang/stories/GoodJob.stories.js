import React from 'react';

import { GoodJob } from '../GoodJob';

export default {
  title: 'Visang|GoodJob',

  parameters: {
    component: GoodJob,
  },
};

export const goodjob = () => (
  <GoodJob view={true} oComplete={()=> console.log('onComplete')} imageUrl={'/kor_lib/images/goodjob.png'} />
);
