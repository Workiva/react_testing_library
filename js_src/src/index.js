import * as rtl17 from './rtl-17.esm';
import * as rtl18 from './_react-testing-library';

// The entry point for the react_testing_library JS file.
//
// Conditionally exports, and populates the window with, a version of RTL that's
// compatible with either React 17 or 18, depending on `window.React.version`.

const reactVersion = window.React?.version;
const isReact17 = typeof reactVersion === 'string' && reactVersion.startsWith('17.');

console.log(`RTL: reactVersion: ${reactVersion}, isReact17: ${isReact17}`)

let rtl;
if (isReact17) {
    console.log('RTL: selected React-17-compatible version.');
    rtl = rtl17;
} else {
    console.log('RTL: selected React-18-compatible version.');
    rtl = rtl18;
}
export default rtl;