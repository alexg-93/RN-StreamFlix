import React from 'react';
import { StyleSheet, View , Text } from 'react-native';

interface IBadgeProps {
    text: string|number;
    backgroundColor?: string;
    textColor?: string;
    display: boolean;
}

const Badge = ({text,display=true,backgroundColor='#352F44',textColor='white'}:IBadgeProps) => {
    return (
     display && (
    <View style={[styles.badgeContainer,{backgroundColor:backgroundColor}]}>
        <Text style={[styles.textColor,{color:textColor}]}>{text}</Text>
     </View>)
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        width:80,
        backgroundColor:'#352F44',
        borderRadius:5,
        height:30,
        justifyContent:'center',
        alignItems:'center'
    },
    textColor: {
        fontSize:11,
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
    }
})

export default Badge;
