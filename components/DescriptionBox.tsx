import React from 'react';
import { StyleSheet, View ,Text,StyleProp,ViewStyle,TextStyle } from 'react-native';


interface DescriptionBoxProps {
    description: string;
    customBoxContainerStyle?: StyleProp<ViewStyle>;
    customBoxTextStyle?: StyleProp<TextStyle>;
}

const DescriptionBox = ({description,customBoxContainerStyle,customBoxTextStyle}:DescriptionBoxProps) => {
  return (
    <View style={[styles.movieOverview,customBoxContainerStyle]}>
      <Text style={[styles.overviewText,customBoxTextStyle]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    movieOverview: {
        marginTop: 20,
        backgroundColor: '#352F44',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 20,
      },
      overviewText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 10,
        textAlign: 'center',
      },
});

export default DescriptionBox;
