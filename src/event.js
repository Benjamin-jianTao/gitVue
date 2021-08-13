import mitt from 'mitt';
const VueEvent = mitt();
const event = {};
event.$on = VueEvent.on;
event.$emit = VueEvent.emit;
export default event;