import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/save';
const API_URL_GETPAGE = 'http://localhost:3000/projectSchema/getPage';

export const getOneProjectSchemaFromDB = async (name) => { 
  const pageId = 'Lowcode-' + name;
  try {
    const response = await axios.post(API_URL_GETPAGE, { pageId: pageId });
    const resdata = response.data.data;
    return resdata[0].projectSchema;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

const getScenarioName = function () {
  if (location.search) {
    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general';
  }
  return 'general';
};


export const getProjectSchemaFromDB = async () => {
  const name = getScenarioName();
  const pageId = "Lowcode-" + name;
  try {
    const response = await axios.get(API_URL_GET, {pageId: pageId});
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const importDataSource = async (dataSource) => { 

  const name = getScenarioName();
  const pageId = "Lowcode-" + name;
  console.log(name);
  let projectSchema = await getOneProjectSchemaFromDB(name);

  // 解析 projectSchema
  projectSchema = JSON.parse(projectSchema);
  console.log(projectSchema);
  // 找到 componentsTree
  const componentsTree = projectSchema.componentsTree;


  console.log(componentsTree[0]);

  // 找到目标组件
  const targetComponent = componentsTree[0].children.find(component =>
    component.componentName === "MaterialTableRubber");
    
  // 修改 dataSource 的值
  if (targetComponent) {
    targetComponent.props.dataSource = dataSource;
  }

  // 更新 projectSchema
  projectSchema.componentsTree = componentsTree;
  
  projectSchema = JSON.stringify(projectSchema);
  const dataWithKey = {
    pageId: pageId,
    pageName: name,
    projectSchema: projectSchema
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