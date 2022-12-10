import React from 'react';
import { DualAxes } from '@ant-design/plots';
import { CurrencyWithCommas } from '@core/helpers/converter';

const AdminDashboard = () => {
  const data = [
    {
      time: '2022-07',
      'Doanh thu': 35000000,
      'Tổng số đơn': 800,
    },
    {
      time: '2022-08',
      'Doanh thu': 90000000,
      'Tổng số đơn': 600,
    },
    {
      time: '2022-09',
      'Doanh thu': 30000000,
      'Tổng số đơn': 400,
    },
    {
      time: '2022-10',
      'Doanh thu': 45000000,
      'Tổng số đơn': 380,
    },
    {
      time: '2022-11',
      'Doanh thu': 47000000,
      'Tổng số đơn': 220,
    },
  ];
  const config = {
    data: [data, data],
    xField: 'time',
    yField: ['Doanh thu', 'Tổng số đơn'],
    yAxis: {
      value: {
        min: 0,
        label: {
          formatter: (val) => {
            const value = CurrencyWithCommas(Number(val), 'đ');
            console.log(value);
            return val;
          },
        },
      },
      count: true,
    },
    geometryOptions: [
      {
        geometry: 'column',
        color: '#5B8FF9',
        columnWidthRatio: 0.4,
        label: {
          position: 'middle',
        },
      },
      {
        geometry: 'line',
        smooth: true,
        color: '#5AD8A6',
      },
    ],
    interactions: [
      {
        type: 'element-highlight',
      },
      {
        type: 'active-region',
      },
    ],
    annotations: {
      value: [
        {
          type: 'text',
          position: ['2022-06', 'min'],
          content: '',
        },
      ],
      count: [
        {
          type: 'dataMarker',
          top: true,
          position: ['2022-05', 400],
          line: {
            length: 20,
          },
          text: {
            content: '',
            style: {
              textAlign: 'left',
            },
          },
        },
      ],
    },
  };
  return <DualAxes {...config} />;
}

export default AdminDashboard