import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Root from './Root';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider 
      {...eva} 
      theme={{...eva.light, ...theme}}
      customMapping={mapping}>
      <Root />
    </ApplicationProvider>
  </>
);

export default App;