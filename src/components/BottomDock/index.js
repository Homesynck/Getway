import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const HomeIcon = (props) => (
    <Icon {...props} name='cube-outline'/>
  );  

const PeoplesIcon = (props) => (
  <Icon {...props} name='people-outline'/>
);

const AddIcon = (props) => (
  <Icon {...props} name='plus-square-outline'/>
);

const SettingsIcon = (props) => (
  <Icon {...props} name='settings-outline'/>
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const BottomDock = () => {

  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

  return (
    <React.Fragment>

      <BottomNavigation style={styles.bottomNavigation} {...bottomState}>
        <BottomNavigationTab icon={PersonIcon}/>
        <BottomNavigationTab icon={BellIcon}/>
        <BottomNavigationTab icon={EmailIcon}/>
      </BottomNavigation>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});