import { PropsWithChildren, useEffect, useState } from "react";
import { Animated, useAnimatedValue, ViewStyle } from "react-native";

export type AnimatedProps = PropsWithChildren<{
  style: ViewStyle;
  isAnimated?: boolean;
  onTouchStart?: () => void;
}>;

const RotatingView: React.FC<AnimatedProps> = (props) => {
  const { isAnimated, style, onTouchStart } = props;
  const rotateAnim = useAnimatedValue(0);

  const [val, setVal] = useState(0);
  const [animation, setAnimation] =
    useState<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (!isAnimated) {
      if (animation) {
        animation.stop();
        setAnimation(null);
      }
      rotateAnim.setValue(0);
      return;
    }
    const rotate = Animated.timing(rotateAnim, {
      easing: (n) => n,
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    if (!props.isAnimated) {
      return;
    }
    const a = Animated.loop(rotate);
    setAnimation(a);
    a.start();
    rotateAnim.addListener((animVal) => {
      console.log(animVal.value);
      setVal(animVal.value);
    });
  }, [rotateAnim, isAnimated]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{ rotate: `${val * 360}deg` }],
        // Bind opacity to animated value
      }}
      onTouchStart={onTouchStart}
    >
      {props.children}
    </Animated.View>
  );
};

export default RotatingView;
