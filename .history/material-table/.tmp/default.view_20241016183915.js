import * as componentInstances from 'F:\\Mywebsites\\material-table\\material-table\\src\\index.tsx';



import 'F:\\Mywebsites\\material-table\\material-table\\src\\index.scss'


export { default } from 'F:\\Mywebsites\\material-table\\material-table-rubber\\src\\index.tsx';

export * from 'F:\\Mywebsites\\material-table\\material-table-rubber\\src\\index.tsx';

const coveredComponents = {};

const library = 'BizComp';
const execCompile = !!false;

if (!execCompile) {
  window[library] = Object.assign({__esModule: true}, componentInstances || {}, coveredComponents || {});
}

function getRealComponent(component, componentName) {
  if (component.default) return component.default;
  if (component[componentName]) return component[componentName];
  return component;
}