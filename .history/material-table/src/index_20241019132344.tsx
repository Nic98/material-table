import * as React from 'react';
import {useState, useEffect, forwardRef, ForwardRefRenderFunction } from 'react';
import { Badge, Table } from 'antd/es';
import _ from 'lodash';
import { addGoods, getGoodsList, deleteGoods, updateGoods } from './services/goodsServices.js';


interface ComponentProps {
  // title: string;
  // content: string;
  dataSource?: string;
  sign?: string;
}



const MaterialTableComponent = (props: ComponentProps, ref: any) => {
  let { dataSource, ...others } = props;
  console.log(`this are the props of materialTable ${dataSource}, ${others}}`);
  
  // const currDoc = window.AliLowCodeEngine.project.currentDocument;
  // const schema = currDoc.exportSchema();
  // const components = currDoc.getComponentsMap();

  // console.log(schema, components);



  const getTable = async () => {
    try {
      const data = await getGoodsList();
      console.log(`here are the data~~~: ${data}`);
      dataSource = data;
      localStorage.setItem('data', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error updating table:', error);
      return [];
    }
  }

  
  useEffect(() => { 
    try {
      
      // const paramList = localStorage.getItem("data");
      // setFilterparamList(paramList ? JSON.parse(paramList) : []);
      // setFilterparamList(schema);
      getTable();
    } catch (error) {
      console.log('error', error);
    }
  }, []);






  return (
    <div ref={ref}>
      <Table
      columns={_.filter(columns, (item: { show: boolean; }) => item.show !== false)}
      dataSource={_.uniqBy(dataSource, 'key')}
      pagination={false}
      size="middle"
      scroll={{ y: 350 }}
      />
    </div>
  );
};

const RefMaterialTableComponent = forwardRef(MaterialTableComponent as ForwardRefRenderFunction<any, ComponentProps>);
RefMaterialTableComponent.displayName = 'MaterialTableComponent';

export default RefMaterialTableComponent;
