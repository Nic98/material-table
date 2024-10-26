import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/add';


const getScenarioName = function () {
  if (location.search) {
    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general';
  }
  return 'general';
};


export const getProjectSchemaFromDB = async () => {
  try {
    const response = await axios.get(API_URL_GET);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const importDataSource = async (dataSource) => { 

  const name = getScenarioName();
  const projectSchema = await getProjectSchemaFromDB();

  console.log("import",projectSchema);
  let componentsTree = projectSchema[0].content.componentsTree;
  
  // 找到目标组件
  const targetComponent = componentsTree[0].children.find(component => component.componentName === "MaterialTableRubber");
  
  // 修改 dataSource 的值
  if (targetComponent) {
    targetComponent.props.dataSource = dataSource;
  }

  // 更新 projectSchema
  projectSchema.componentsTree = componentsTree;

  const dataWithKey = {
    pageName: name,
    schema: projectSchema
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
