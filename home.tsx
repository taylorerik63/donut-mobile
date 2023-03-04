import React from 'react';
import { View, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import colors from '~/styles/colors';

const TabBarHomeComponent: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        backgroundColor: colors.darkenWhite,
        borderTopColor: colors.darkWhite,
        borderTopWidth: 1,
      }}
    >
      {state.routes.map((route, index) => {
        const {
          options: { tabBarIcon: TabIcon, tabBarLabel, title },
        } = descriptors[route.key];
        let label:
          | string
          | ((props: { focused: boolean; color: string }) => React.ReactNode);
        if (tabBarLabel === undefined) {
          label = title !== undefined ? title : route.name;
        } else {
          label = tabBarLabel;
        }
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={`tab-bar-${String(label).toLocaleLowerCase()}`}
            testID={`tab-bar-${label}`}
            accessible
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 5,
            }}
          >
            <TabIcon
              focused={isFocused}
              color={isFocused ? colors.purple : colors.darkGrey}
              size={20}
            />
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};
export default TabBarHomeComponent;
