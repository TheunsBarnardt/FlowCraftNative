import React, { ReactNode, ReactElement } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface HStackProps {
  children?: ReactNode;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

const HStackBlock: React.FC<HStackProps> = ({ children, spacing = 8, style, ...props }) => {
  return (
    <View style={[styles.hstack, style]} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement, {
            style: [child.props.style, index !== 0 && { marginLeft: spacing }],
          });
        }
        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  hstack: {
    flexDirection: 'row',
  },
});

export default HStackBlock;
