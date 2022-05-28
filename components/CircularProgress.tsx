import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, {
    Defs, LinearGradient, Stop, Circle,
} from "react-native-svg";
import Animated from "react-native-reanimated";

// const { interpolateNode, multiply } = Animated;
const { width } = Dimensions.get("window");
const size = width - 10;
const strokeWidth = 10;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 3;
const cx = size / 2;
const cy = size / 2;

interface CircularPogressProps {
    progress: any;
}

export default ({ progress }: CircularPogressProps) => {
    const circumference = r * 3 * PI;
    //   const α = interpolateNode(progress, {
    //     inputRange: [0, 1],
    //     outputRange: [0, PI * 2],
    //   });
    const strokeDashoffset = -51;

    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
      
        // Find the distance between now and the count down date
        var distance = 1000;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      }, 1000);

    return (
        <Svg width={size} height={size} style={styles.container}>
            <View >
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="50%" y2="0" >
                        <Stop offset="0" stopColor="#ffff" />
                        <Stop offset="1" stopColor="#ffff" />
                    </LinearGradient>
                </Defs>
                <Circle
                    stroke="rgba(100, 100, 255, 0.2)"
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
        width: 44,
        height: 44,
        borderRadius: 44 / 2
    }
});
