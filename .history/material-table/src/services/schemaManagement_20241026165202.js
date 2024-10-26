import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/save';


const getScenarioName = function () {
  if (location.search) {
    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general';
  }
  return 'general';
};


export const getProjectSchemaFromDB = async () => {
  try {
    const response = await axios.get(API_URL_GET);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const importDataSource = async (dataSource) => { 

  const name = getScenarioName();
  const projectSchema = await getProjectSchemaFromDB();
  const newProjectSchema = Object.assign({}, projectSchema);
  
  let componentsTree = JSON.parse((newProjectSchema.data)[0].projectSchema).componentsTree;
  
  // 找到目标组件
  const targetComponent = componentsTree[0].children.find(component => component.componentName === "MaterialTableRubber");
  
  // 修改 dataSource 的值
  if (targetComponent) {
    targetComponent.props.dataSource = dataSource;
  }

  // 更新 projectSchema
  targetComponent.componentsTree = componentsTree;

  console.log('Updated projectSchema:', newProjectSchema);

  const pageId = newProjectSchema.componentsTree[0].docId;
  newProjectSchema = JSON.stringify(newProjectSchema);
  const dataWithKey = {
    pageId: pageId,
    pageName: name,
    projectSchema: newProjectSchema
  }

  try { 
    const response = await axios.post(API_URL_POST, dataWithKey);
    console.log('Success:', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
