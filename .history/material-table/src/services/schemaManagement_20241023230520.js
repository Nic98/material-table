import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/add';


export const getProjectSchemaFromDB = async (data) => {
  try {
    const response = await axios.get(API_URL_GET, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const getScenarioName = function () {
  if (location.search) {
    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general';
  }
  return 'general';
};

export const importDataSource = async (dataSource) => { 
  const name = getScenarioName();
  // let projectSchema;
  // let target_key;
  // for (let i = 0; i < localStorage.length; i++) { 
  //   const key = localStorage.key(i); 
  //   if (key.endsWith('projectSchema')) { 
  //     projectSchema = JSON.parse(await localStorage.getItem(key));
  //     target_key = key;
  //   }
  // }
  
  co
  console.log("import",projectSchema);
  let componentsTree = projectSchema.componentsTree;

  // 找到目标组件
  const targetComponent = componentsTree[0].children.find(component => component.componentName === "MaterialTableRubber");
  
  // 修改 dataSource 的值
  if (targetComponent) {
    targetComponent.props.dataSource = dataSource;
  }

  // 更新 projectSchema
  projectSchema.componentsTree = componentsTree;

  // 保存回 localStorage
  localStorage.setItem(target_key, JSON.stringify(projectSchema));

  const dataWithKey = {
    
  }
  try { 
    const response = await axios.post(API_URL_POST, projectSchema);
    console.log('Success:', response);
  }


}

export const getDataSource = async () => { 

  let projectSchema;
  let target_key;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.endsWith('projectSchema')) {
      projectSchema = JSON.parse(await localStorage.getItem(key));
      target_key = key;
    }
  }
  // 假设 componentsTree 是 projectSchema 的一部分

  console.log("get", projectSchema);

  let componentsTree = projectSchema.componentsTree;

  // 找到目标组件
  const targetComponent = componentsTree[0].children.find(component => component.componentName === "MaterialTableRubber");
  
  // 获取 dataSource 的值
  if (targetComponent) {
    return targetComponent.props.dataSource;
  }

  return [];
}