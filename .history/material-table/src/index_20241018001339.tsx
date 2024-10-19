import * as React from 'react';
import {useState, useEffect, forwardRef, ForwardRefRenderFunction } from 'react';
import { Badge, Table } from 'antd/es';
import _ from 'lodash';

import axios from 'axios';
interface ComponentProps {
  // title: string;
  // content: string;
  dataSource?: any[];
}

const API_URL_GET = 'http://localhost:3000/goods';

const getGoodsList = async (data:any) => {
  try {
    const response = await axios.get(API_URL_GET, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


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

  const get

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
