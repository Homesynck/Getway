import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    StyledComponentProps,
    LayoutProps,
    Layout,
    useTheme
} from '@ui-kitten/components';

//insset = 'top' | 'bottom'

export const SafeAreaLayout = ({
  insets,
  ...props
}) => {
  const theme = useTheme();
  const backgroundColor = theme[`background-basic-color-${props.level}`];

  const insetsConfig = useSafeAreaInsets();

  return (
    <Layout
      {...props}
      style={[
        props.style,
        backgroundColor && { backgroundColor },
        {
          paddingTop: (insets === 'top') ? insetsConfig.top : 0,
          paddingBottom: (insets === 'bottom') ? insetsConfig.bottom : 0
        }
      ]}
    />
  );
};
