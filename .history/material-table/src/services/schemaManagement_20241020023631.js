export const importDataSource = async (dataSource) => { 
  let projectSchema = JSON.parse(window.localStorage.getItem('projectschema'));
  // 假设 componentsTree 是 projectSchema 的一部分
  console.log(window.localStorage.getItem('projectschema'));
  console.log(dataSource);
  let componentsTree = projectSchema.componentsTree;

  // 找到目标组件
  const targetComponent = componentsTree[0].children.find(component => component.id === "node_ocm2fppm6d1");
  
  // 修改 dataSource 的值
  if (targetComponent) {
    targetComponent.props.dataSource = "dataSource";
  }

  // 更新 projectSchema
  projectSchema.componentsTree = componentsTree;

  // 保存回 localStorage
  localStorage.setItem('projectschema', JSON.stringify(projectSchema));

  return projectSchema;
}