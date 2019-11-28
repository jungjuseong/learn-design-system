import React from 'react';

import { ToggleBtn, AudioBtn } from '../MyButton';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Visang|MyButton',

  parameters: {
    component: ToggleBtn, AudioBtn
  },
};

export const toggleButtons = () => (
  <div>
    <ToggleBtn name="btn_down" onClick={action('button action click')}/>
    <ToggleBtn name="btn_down" on disabled />

    <ToggleBtn name="btn_up" onClick={action('button action click')} />
    <ToggleBtn name="btn_up" on disabled />
    <hr/>

    </div>
);

export const audioButtons = () => (
  <div>
    <AudioBtn 
      view={true}
      name={`btn_audio swiper-no-swiping`}
      //src={App.data_url + data.audio}
      disabled={false}
      onClick={action('Audio Button action click')}>
    </AudioBtn>
    <hr/>
  </div>
);
