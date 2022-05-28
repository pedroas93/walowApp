import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
// import Animated, { Easing } from "react-native-reanimated";
// import { runTiming } from "react-native-redash";

import CircularProgress from "./components/CircularProgress";

// const { Clock } = Animated;

export default () => {
  const [isActive, setIsActive] = useState(false);
  const [buttonMinutteSelected, setButtonMinutteSelected] = useState(1);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((buttonMinutteSelected) => (buttonMinutteSelected+60 ) - 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };



  const empezar = () => {
    handleStart()
    setPlay(!play)
  }

  function Timer(props) {
    return (
      <View style={styles.timer}>
        <Text style={styles.numbersTimer}>
          {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
        </Text>
        <Text style={styles.numbersTimer}>
          {("0" + ((props.time / 10) % 100)).slice(-2)}
        </Text>
      </View>
    );
  }
  return (
    <LinearGradient colors={['#BCBCC7', '#7B66FF']} style={styles.linearGradient}>

      <View style={styles.container}>
        <TouchableOpacity>
          <Image style={styles.imageBack} source={require('./Files/Vector_5.png')} />
        </TouchableOpacity>
        
        <View style={styles.middelCircle}>
          <View style={styles.centerCircle}>
            {/* <Image style={styles.imageBack} source={require('./Files/Vector_5.png')} /> */}
            <TouchableOpacity>
              <Image style={styles.icon} source={require('./Files/Vector_1.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>Breathe & relax</Text>
        <CircularProgress progress={3} />
        <Timer time={buttonMinutteSelected} />
        <TouchableOpacity
          onPress={empezar}
        >
          <Image style={styles.play} source={require('./Files/Play.png')} />
        </TouchableOpacity>
        <View style={styles.timeSection}>

          <TouchableOpacity
            style={buttonMinutteSelected === 1 ? styles.minuteOneButtonSelected : styles.minuteOneButtonNotSelected}
            onPress={() => setButtonMinutteSelected(1)}
          >
            <Image style={styles.buttonActive} source={require('./Files/alarm_clock.png')} />
            <Text style={styles.minuteTextButtom}>1 min</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonMinutteSelected === 2 ? styles.minuteTwoButtonSelected : styles.minuteTwoButtonNotSelected}
            onPress={() => setButtonMinutteSelected(2)}
          >
            <Image style={styles.buttonActive} source={require('./Files/alarm_clock.png')} />
            <Text style={styles.minuteTextButtom}>2 min</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={buttonMinutteSelected === 3 ? styles.minuteThreeButtonSelected : styles.minuteThreeButtonNotSelected}
            onPress={() => setButtonMinutteSelected(3)}
          >
            <Image style={styles.buttonActive} source={require('./Files/alarm_clock.png')} />
            <Text style={styles.minuteTextButtom}>3 min</Text>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  imageBack: {
    // position: absolute;
    // width: 7,
    // height: 19,
    // left: 119,
    // top: 102,
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
    transform: [{ rotate: '0deg' }]
  },
  title: {
    // width: 279,
    // height: 108,
    // left: 375,
    // top: 240,
    fontFamily: 'BRHendrix-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 36,
    lineHeight: 121,
    textAlign: 'center',
    letterSpacing: -0.03,
    color: '#FFFFFF',
  },
  centerCircle: {
    position: 'absolute',
    top: 26,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    backgroundColor: '#7B66FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,

  },
  middelCircle: {
    position: 'absolute',
    top: 270,
    width: Dimensions.get('window').width * 0.53,
    height: Dimensions.get('window').width * 0.53,
    backgroundColor: '#7B66FF',
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
  },

  icon: {
    position: 'absolute',
    top: -40,
    left: -45
  },

  play: {
    width: 60,
    height: 60,
    marginBottom: 60
  },

  minuteOneButtonSelected: {
    width: 110,
    height: 53,
    backgroundColor: '#9386EA',
    left: 10,
    top: 14,
    borderRadius: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  minuteOneButtonNotSelected: {
    width: 110,
    height: 53,
    backgroundColor: '#685BC3',
    left: 10,
    top: 14,
    borderRadius: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  minuteTwoButtonSelected: {
    width: 129,
    height: 53,
    left: 15,
    top: 14,
    borderRadius: 11,
    opacity: 0.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#9386EA"
  },


  minuteTwoButtonNotSelected: {
    width: 110,
    height: 53,
    backgroundColor: '#685BC3',
    left: 10,
    top: 14,
    borderRadius: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  minuteThreeButtonSelected: {
    width: 129,
    height: 53,
    left: 30,
    top: 14,
    borderRadius: 11,
    opacity: 0.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#9386EA"
    // background: '#FFFFFF',
    // opacity: 0.2,
    // borderRadius: 11,
  },
  minuteThreeButtonNotSelected: {
    width: 129,
    height: 53,
    left: 30,
    top: 14,
    borderRadius: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#685BC3"
    // background: '#FFFFFF',
    // opacity: 0.2,
    // borderRadius: 11,
  },

  timeSection: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  minuteTextButtom: {
    color: '#FFFFFF',
    fontFamily: 'BRHendrix-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 29,
    letterSpacing: -0.03,
    marginStart: 6,
    marginTop: 9,
    left: 0
  },

  buttonActive: {
    color: '#FFFFFF',
    width: 35,
    height: 35,
    marginTop: 10,
    left: 5,
    zIndex: 10
  },

  timer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

  },

  numbersTimer: {
    // width: 56,
    // height: 29,
    // left: 486,
    marginTop: - 84,

    fontFamily: 'BRHendrix-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 121.4,

    textAlign: 'center',
    letterSpacing: -0.03,

    color: '#FFFFFF',
  }


});