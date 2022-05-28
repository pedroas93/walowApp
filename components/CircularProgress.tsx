import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Svg, {
    Defs, LinearGradient, Stop, Circle,
} from "react-native-svg";
import Animated from "react-native-reanimated";

// const { interpolateNode, multiply } = Animated;
const { width } = Dimensions.get("window");
const size = width - 10;
const strokeWidth = 5;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 3.2;
const cx = size / 2;
const cy = size / 2;


interface CircularPogressProps {
    progress: any;
    buttonMinutteSelected: any
}

export default ({ progress, buttonMinutteSelected }: CircularPogressProps) => {

    const circumference = r * 4 * PI;
    let timeLong = 600;
    if(buttonMinutteSelected === 1){
        timeLong = 600;
    }else if(buttonMinutteSelected === 2) {
        timeLong = 1200
    }else if(buttonMinutteSelected === 3) {
        timeLong = 1800
    }
    const strokeDashoffset = (((progress)/timeLong-100)*10).toFixed();
    console.log('----> ', strokeDashoffset)
    return (
        <Svg width={size} height={size} style={styles.container}>
            <View >
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="50%" y2="0" >
                        <Stop offset="0" stopColor="rgba(225, 225, 225, 0.1)" />
                        <Stop offset="1" stopColor="rgba(225, 225, 225, 0.1)" />
                    </LinearGradient>
                </Defs>
                <Circle
                    stroke="rgba(100, 100, 100, 0.2)"
                    fill="none"
                    {...{
                        strokeWidth, cx, cy, r,
                    }}
                />
            </View>
            <AnimatedCircle
                stroke="url(#grad)"
                fill="none"
                strokeDasharray={`${circumference}, ${circumference}`}
                {...{
                    strokeDashoffset, strokeWidth, cx, cy, r,
                }}
            />
        </Svg>
    );
};

const styles = StyleSheet.create({
    container: {
        transform: [{ rotateZ: "270deg" }],
    },
    circle: {
        backgroundColor: '#FFFFFF50'
    },
    circlePointer: {
        width: 40,
        height: 40,
        borderRadius: 44 / 2
    }
});
