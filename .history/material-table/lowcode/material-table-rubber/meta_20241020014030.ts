
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
      {
        title: {
          label: {
            type: "i18n",
            "en-US": "Data Source",
            "zh-CN": "数据源"
          }
        },
        name: "dataSource",
        setter: {
          componentName: "ObjectSetter",
          initialValue: "[]",
        }
      },
      {
        title: {
          label: {
            type: "i18n",
            "en-US": "Sign",
            "zh-CN": "信号"
          }
        },
        name: "Sign",
        setter: {
          componentName: "StringSetter",
          initialValue: "table",
        }
      }
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
