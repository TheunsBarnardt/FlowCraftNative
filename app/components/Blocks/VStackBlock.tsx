import React, { ReactNode, ReactElement } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface VStackProps {
  children?: ReactNode;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

const VStackBlock: React.FC<VStackProps> = ({ children, spacing = 8, style }) => {
  return (
    <View style={[styles.vstack, style]}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement, {
            style: [child.props.style, index !== 0 && { marginTop: spacing }],
          });
        }
        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  vstack: {
    flexDirection: 'column',
  },
});

export default VStackBlock;
