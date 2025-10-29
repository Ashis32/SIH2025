import React from 'react';
import { mockAnalytics } from '../mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  Activity
} from 'lucide-react';

const Analytics = () => {
  const { 
    totalTickets, 
    openTickets, 
    inProgressTickets, 
    resolvedTickets,
    avgResolutionTime,
    satisfactionRate,
    ticketsByCategory,
    ticketsByPriority,
    ticketTrend
  } = mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Analytics Dashboard</h1>
        <p className="text-slate-600 mt-1">Track performance metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Tickets</CardTitle>
            <BarChart3 className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{totalTickets}</div>
            <p className="text-xs text-slate-500 mt-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Resolution Time</CardTitle>
            <Clock className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{avgResolutionTime}</div>
            <p className="text-xs text-slate-500 mt-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              8% faster
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Satisfaction Rate</CardTitle>
            <Target className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{satisfactionRate}%</div>
            <p className="text-xs text-slate-500 mt-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              3% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Resolution Rate</CardTitle>
            <Activity className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">
              {Math.round((resolvedTickets / totalTickets) * 100)}%
            </div>
            <p className="text-xs text-slate-500 mt-2">{resolvedTickets} resolved tickets</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tickets by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Category</CardTitle>
            <CardDescription>Distribution across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketsByCategory.map((item) => {
                const percentage = (item.count / totalTickets) * 100;
                return (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{item.category}</span>
                      <span className="text-sm text-slate-600">{item.count} tickets</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-blue-700 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tickets by Priority */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Priority</CardTitle>
            <CardDescription>Priority level distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketsByPriority.map((item) => {
                const percentage = (item.count / totalTickets) * 100;
                const colors = {
                  'Critical': 'from-red-500 to-red-600',
                  'High': 'from-orange-500 to-orange-600',
                  'Medium': 'from-yellow-500 to-yellow-600',
                  'Low': 'from-slate-400 to-slate-500'
                };
                return (
                  <div key={item.priority}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{item.priority}</span>
                      <span className="text-sm text-slate-600">{item.count} tickets</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className={`bg-gradient-to-r ${colors[item.priority]} h-2.5 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Ticket Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ticket Trend (Last 6 Months)</CardTitle>
            <CardDescription>Monthly ticket volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {ticketTrend.map((item) => {
                const height = (item.count / Math.max(...ticketTrend.map(t => t.count))) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center">
                    <div className="w-full relative group">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-600"
                        style={{ height: `${height * 2}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded">
                          {item.count}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 mt-2 font-medium">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Open Tickets</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{openTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">In Progress</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{inProgressTickets}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Resolved</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{resolvedTickets}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;