import React from 'react';
import { configure, addDecorator  } from '@storybook/react';
import { GlobalStyle } from '../src/shared/global';

addDecorator(story => (
    <React.Fragment>
      <GlobalStyle />
      {story()}
    </React.Fragment>
));

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
