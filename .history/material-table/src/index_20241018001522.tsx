import * as React from 'react';
import {useState, useEffect, forwardRef, ForwardRefRenderFunction } from 'react';
import { Badge, Table } from 'antd/es';
import _ from 'lodash';
import { addGoods, getGoodsList, deleteGoods, updateGoods } from './services/goodsServices.js';


interface ComponentProps {
  // title: string;
  // content: string;
  dataSource?: any[];
}



const MaterialTableComponent = (props: ComponentProps, ref: any) => {
  const { dataSource, ...others } = props;
  console.log(`this are the props of materialTable ${dataSource}, ${others}}`);


  interface Column {
    title: string;
    dataIndex: string;
    key: string;
    render?: (text: any, record: any) => JSX.Element | string;
  }

  const columns: Column[] = [{
    title: '规则名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '描述s',
    dataIndex: 'desc',
    key: 'desc',
  }, {
    title: '服务调用次数',
    dataIndex: 'callNo',
    key: 'callNo',
    render: (text, record) => `${record.callNo}万`,
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'state',
    render: (text, record) => {
      let statusText: string;
      let statusType: 'default' | 'processing' | 'success' | 'error';

      switch (record.status) {
        case '0':
          statusText = 'Closed';
          statusType = 'default';
          break;
        case '1':
          statusText = 'Running';
          statusType = 'processing';
          break;
        case '2':
          statusText = 'Online';
          statusType = 'success';
          break;
        case '3':
          statusText = 'Error';
          statusType = 'error';
          break;
        default:
          statusText = 'Unknown';
          statusType = 'default';
      }
      return <Badge status={statusType} text={statusText} />;
    }
  }];
  
  const currDoc = window.AliLowCodeEngine.project.currentDocument;
  const schema = currDoc.exportSchema();
  const components = currDoc.getComponentsMap();

  console.log(schema, components);

  const getTable =  async (name: string, id: string) => {
    console.log(`the name and id are:${name}, ${id}`);

    if (name === '' && id === '') {
      try {
        const data = await getGoodsList();
        console.log(`here are the data~~~: ${data}`);
        setData(filterparamList);
        localStorage.setItem('data', JSON.stringify(data));
        // currDoc.importSchema(data); // 将数据导入到 schema 中
        props.dataSource = data;
      } catch (error) {
        console.error('Error updating table:', error);
      }
      return;
    }

  const [filterparamList, setFilterparamList] = useState([]);
  useEffect(() => { 
    try {
      
      // const paramList = localStorage.getItem("data");
      // setFilterparamList(paramList ? JSON.parse(paramList) : []);
      setFilterparamList(schema);

      
    } catch (error) {
      console.log('error', error);
    }
  }, [filterparamList]);

  return (
    <div ref={ref}>
      <Table
      columns={_.filter(columns, (item: { show: boolean; }) => item.show !== false)}
      dataSource={_.uniqBy(filterparamList, 'key')}
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
