


export const importDataSource = async (dataSource) => { 
  let projectSchema;

  for (let i = 0; i < localStorage.length; i++) { 
    const key = localStorage.key(i); 
    if (key.endsWith('projectSchema')) { 
      projectSchema = JSON.parse(await localStorage.getItem('projectSchema'));
    }
  }
  console.log(projectSchema);
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
  localStorage.setItem('projectSchema', JSON.stringify(projectSchema));

}

export const getDataSource = async () => { 

  let projectSchema;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.endsWith('projectSchema')) {
      projectSchema = JSON.parse(await localStorage.getItem('projectSchema'));
    }
  }
  // 假设 componentsTree 是 projectSchema 的一部分

  console.log(projectSchema);

  let componentsTree = projectSchema.componentsTree;

  // 找到目标组件
  const targetComponent = componentsTree[0].children.find(component => component.componentName === "MaterialTableRubber");
  
  // 获取 dataSource 的值
  if (targetComponent) {
    return targetComponent.props.dataSource;
  }

  return [];
}