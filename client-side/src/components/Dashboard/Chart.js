import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('28.08.20', 4000),
  createData('28.09.20', 5000),
  createData('28.10.20', 4800),
  createData('28.11.20', 5200),
  createData('28.12.20', 5800),
  createData('01.01.21', 5850),
  createData('28.01.21', 6100),
  createData('28.04.21', 6700),
  createData('24.06.21', 8100),
  createData('28.08.21', undefined),
    
];

export default function Chart() {
const theme = useTheme()
  return (
    <React.Fragment>
      <Title>Stanje od prvog ulaganja</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Dobit (€)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
