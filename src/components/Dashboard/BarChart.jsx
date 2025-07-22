import { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


// Static chart data (last 1 month)
const chartData = [
  { name: "Week 1", Orders: 20, Revenue: 25000 },
  { name: "Week 2", Orders: 22, Revenue: 30000 },
  { name: "Week 3", Orders: 18, Revenue: 22000 },
  { name: "Week 4", Orders: 27, Revenue: 48000 },
];

// Function to format numbers with "$" and "k"
const formatCurrency = (value) => `$${(value / 1000).toFixed(1)}k`;

export default class Example extends PureComponent {
  render() {
    return (
      <div className='w-full h-full text-sm'>
        {/* Chart Section */}
        <div className="bg-white rounded shadow p-2 h-full w-full flex flex-col">
          <h2 className="text-xl font-semibold mb-2">
            Orders & Revenue (Last 1 Month)
          </h2>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" hide />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="Orders" fill="#8884d8" name="Orders" />
                <Bar yAxisId="right" dataKey="Revenue" fill="#82ca9d" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}