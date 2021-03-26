import React from 'react';
import { BottomNavigationTab, Divider } from '@ui-kitten/components';

import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandBottomNavigation } from '../../components/brand-bottom-navigation.component';
import { ContactsOutlineIcon, HomeOutlineIcon, AddOutlineIcon } from '../../components/icons';

export const HomeBottomNavigation = (props) => {

  const onSelect = (index) => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  return (
    <SafeAreaLayout insets='bottom'>
      <Divider/>
      <BrandBottomNavigation
        appearance='noIndicator'
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        <BottomNavigationTab
          title='Accueil'
          icon={HomeOutlineIcon}
        />
        <BottomNavigationTab
          title='Ajout'
          icon={AddOutlineIcon}
        />
        <BottomNavigationTab
          title='Contacts'
          icon={ContactsOutlineIcon}
        />
      </BrandBottomNavigation>
    </SafeAreaLayout>
  );
};
