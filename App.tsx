import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Animated, Easing } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import CircularProgress from "./components/CircularProgress";

// const { Clock } = Animated;

export default () => {
  const [isActive, setIsActive] = useState(false);
  const [buttonMinutteSelected, setButtonMinutteSelected] = useState(1);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(60000);
  const [play, setPlay] = useState(false);
  const move = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');
  const circleSize = width / 2;
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: buttonMinutteSelected * 6 * 1000,
          ease: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: buttonMinutteSelected * 6 * 1000,
          ease: Easing.linear,
          useNativeDriver: true
        })
      ]),
    ).start();
  }, [fadeAnim])

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false && time > 0) {
      interval = setInterval(() => {
        setTime((buttonMinutteSelected) => (buttonMinutteSelected + 60) - 100);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, time]);
  const handleStart = () => {
    // fadeIn()
    setIsActive(true);
    setIsPaused(false);
  };


  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };
  const playGo = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
      // setIsPaused(false);
    } else {
      setIsActive(false);
      // setIsPaused(true);
      // setTime(0);
    }
  }

  function Timer(props) {
    return (
      <View style={styles.timer}>
        <Text style={isActive ? styles.numbersTimer : styles.numbersTimerDesactive}>
          {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        </Text>
        <Text style={isActive ? styles.numbersTimer : styles.numbersTimerDesactive}>
          {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
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
            <TouchableOpacity>
              {isActive &&
                <Animated.Image
                  source={require('./Files/Vector_6.png')}
                  resizeMode='cover'
                  style={{
                    opacity: fadeAnim,
                  }}
                />
              }
              {!isActive &&
                <Image style={isActive ? styles.iconActive : styles.icon} source={isActive ? require('./Files/Vector_6.png') : require('./Files/Vector_1.png')} />
              }
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>Breathe & relax</Text>
        { (isActive && time >  time/2 )&& 

        <Text style={styles.subTitle}>Inhale</Text>
        }
        {(isActive && time < time/2 )&&
          
          <Text style={styles.subTitle}>Exhale</Text>
        }
        <CircularProgress progress={time} buttonMinutteSelected={buttonMinutteSelected} />
        <Timer time={time} />
        <TouchableOpacity
          onPress={playGo}
        >
          <Image style={styles.play} source={isActive ? require('./Files/Pause.png') : require('./Files/Play.png')} />
        </TouchableOpacity>
        <View style={styles.timeSection}>

          <TouchableOpacity
            style={buttonMinutteSelected === 1 ? styles.minuteOneButtonSelected : styles.minuteOneButtonNotSelected}
            onPress={() => { setButtonMinutteSelected(1), setTime(60000) }}
          >
            <Image style={styles.buttonActive} source={require('./Files/alarm_clock.png')} />
            <Text style={styles.minuteTextButtom}>1 min</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonMinutteSelected === 2 ? styles.minuteTwoButtonSelected : styles.minuteTwoButtonNotSelected}
            onPress={() => { setButtonMinutteSelected(2), setTime(120000) }}
          >
            <Image style={styles.buttonActive} source={require('./Files/alarm_clock.png')} />
            <Text style={styles.minuteTextButtom}>2 min</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonMinutteSelected === 3 ? styles.minuteThreeButtonSelected : styles.minuteThreeButtonNotSelected}
            onPress={() => { setButtonMinutteSelected(3), setTime(180000) }}
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
    width: 7,
    height: 19,
    marginStart: -180,
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
    transform: [{ rotate: '0deg' }]
  },
  subTitle: {
    position: "absolute",
    fontFamily: 'BRHendrix-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    top: 180,
    // lineHeight: 121,
    // textAlign: 'center',
    letterSpacing: -0.03,
    color: '#FFFFFF',
    // marginTop: 0,
    // marginBottom: 0
  },
  title: {
    fontFamily: 'BRHendrix-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 121,
    textAlign: 'center',
    letterSpacing: -0.03,
    color: '#FFFFFF',
    paddingBottom: 0,
  },
  centerCircle: {
    position: 'absolute',
    top: 20,
    width: 174,
    height: 174,
    backgroundColor: '#7B66FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,

  },
  middelCircle: {
    position: 'absolute',
    top: 280,
    width: 214,
    height: 214,
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
  iconActive: {
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
    width: 100,
    height: 40,
    backgroundColor: '#9386EA',
    left: 50,
    top: 14,
    borderRadius: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  minuteOneButtonNotSelected: {
    width: 100,
    height: 40,
    backgroundColor: '#685BC3',
    left: 50,
    top: 14,
    borderRadius: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  minuteTwoButtonSelected: {
    width: 100,
    height: 40,
    left: 60,
    top: 14,
    borderRadius: 11,
    opacity: 0.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#9386EA"
  },


  minuteTwoButtonNotSelected: {
    width: 100,
    height: 40,
    backgroundColor: '#685BC3',
    left: 60,
    top: 14,
    borderRadius: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  minuteThreeButtonSelected: {
    width: 100,
    height: 40,
    left: 70,
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
    width: 100,
    height: 40,
    left: 70,
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
    fontSize: 15,
    lineHeight: 29,
    letterSpacing: -0.03,
    marginStart: 6,
    marginTop: 0,
    left: 2
  },

  buttonActive: {
    color: '#FFFFFF',
    width: 25,
    height: 25,
    marginTop: 5,
    marginLeft: 11,
    zIndex: 10
  },

  timer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  numbersTimerDesactive: {
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

    color: '#00000000',
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