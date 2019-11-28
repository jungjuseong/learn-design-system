import React from 'react';
import { configure, addDecorator  } from '@storybook/react';
import { GlobalStyle } from '../src/basic/shared/global';

addDecorator(story => (
    <React.Fragment>
      <GlobalStyle />
      {story()}
    </React.Fragment>
));

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.jsx?$/), module);
