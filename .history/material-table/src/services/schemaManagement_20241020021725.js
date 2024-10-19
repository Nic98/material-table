export const importDataSource = async (dataSource) => { 
  let projectSchema = JSON.parse(localStorage.getItem('projectschema'));
  // 假设 componentsTree 是 projectSchema 的一部分
  let componentsTree = projectSchema.componentsTree;

  // 找到目标组件
  const targetComponent = componentsTree[0].children.find(component => component.id === "node_ocm2fppm6d1");
  console.log(projectSchema);
  // 修改 dataSource 的值
  if (targetComponent) {
    targetComponent.props.dataSource = "newDataSource";
  }

  // 更新 projectSchema
  projectSchema.componentsTree = componentsTree;

  // 保存回 localStorage
  localStorage.setItem('projectschema', JSON.stringify(projectSchema));

  return projectSchema;
}