
import { IPublicTypeComponentMetadata, IPublicTypeSnippet } from '@alilc/lowcode-types';

const MaterialTableRubberMeta: IPublicTypeComponentMetadata = {
  "componentName": "MaterialTableRubber",
  "title": "MaterialTableRubber",
  "docUrl": "",
  "screenshot": "",
  "devMode": "proCode",
  "npm": {
    "package": "material-table-rubber",
    "version": "0.1.0",
    "exportName": "default",
    "main": "src\\index.tsx",
    "destructuring": false,
    "subName": ""
  },
  "configure": {
    "props": [
    ],
    "supports": {
      "style": true
    },
    "component": {}
  }
};
const snippets: IPublicTypeSnippet[] = [
  {
    "title": "MaterialTableRubber",
    "screenshot": "",
    "schema": {
      "componentName": "MaterialTableRubber",
      "props": {}
    }
  }
];

export default {
  ...MaterialTableRubberMeta,
  snippets
};
