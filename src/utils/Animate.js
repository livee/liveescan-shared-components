import Animated, { EasingNode } from 'react-native-reanimated';

const {
  set,
  cond,
  startClock,
  stopClock,
  clockRunning,
  block,
  timing,
  Value,
  Clock
} = Animated;
/**
 *
 * Creates an animation based on 2 values
 * Values will iterate between those values, from sourceValue, to
 *
 * @param {number} sourceValue
 * @param {Value} dest
 * @param {number} duration
 */
export function createAnimation(sourceValue, dest, duration = 250) {
  let clock = new Clock();
  let value = new Value(sourceValue);
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0)
  };
  const config = {
    duration,
    toValue: dest,
    easing: EasingNode.inOut(EasingNode.ease)
  };
  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position
  ]);
}

export default { createAnimation };
