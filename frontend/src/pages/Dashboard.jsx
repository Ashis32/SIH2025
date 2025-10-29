import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockTickets } from '../mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

const Dashboard = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTickets = useMemo(() => {
    return mockTickets.filter(ticket => {
      const matchesSearch = 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchTerm, statusFilter, priorityFilter]);

  const stats = useMemo(() => {
    const open = mockTickets.filter(t => t.status === 'Open').length;
    const inProgress = mockTickets.filter(t => t.status === 'In Progress').length;
    const resolved = mockTickets.filter(t => t.status === 'Resolved').length;
    return { open, inProgress, resolved, total: mockTickets.length };
  }, []);

  const getStatusBadge = (status) => {
    const variants = {
      'Open': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      'In Progress': 'bg-amber-100 text-amber-700 hover:bg-amber-100',
      'Resolved': 'bg-green-100 text-green-700 hover:bg-green-100'
    };
    return variants[status] || 'bg-slate-100 text-slate-700';
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'Critical': 'bg-red-100 text-red-700 hover:bg-red-100',
      'High': 'bg-orange-100 text-orange-700 hover:bg-orange-100',
      'Medium': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
      'Low': 'bg-slate-100 text-slate-700 hover:bg-slate-100'
    };
    return variants[priority] || 'bg-slate-100 text-slate-700';
  };

  const handleComingSoon = (feature) => {
    toast({
      title: 'Coming Soon',
      description: `${feature} feature will be available in the next update`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            {role === 'admin' ? 'Manage all support tickets' : 'View your support tickets'}
          </p>
        </div>
        <Button
          onClick={() => navigate('/new-ticket')}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Tickets</CardTitle>
            <Ticket className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Open</CardTitle>
            <AlertCircle className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.open}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">In Progress</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Resolved</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleComingSoon('AI-powered Auto-routing')}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">AI Auto-routing</h3>
                <p className="text-xs text-slate-500">Coming Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleComingSoon('Automated Classification')}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Auto Classification</h3>
                <p className="text-xs text-slate-500">Coming Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleComingSoon('Smart Knowledge Suggestions')}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Smart Suggestions</h3>
                <p className="text-xs text-slate-500">Coming Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
          <CardDescription>
            {role === 'admin' ? 'All support tickets in the system' : 'Your submitted tickets'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tickets Table */}
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Channel</TableHead>
                  {role === 'admin' && <TableHead>Requester</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={role === 'admin' ? 7 : 6} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <Ticket className="w-12 h-12 mb-3 opacity-50" />
                        <p>No tickets found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                      <TableCell className="font-medium">{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(ticket.status)}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(ticket.priority)}>{ticket.priority}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{ticket.category}</TableCell>
                      <TableCell className="text-sm text-slate-600">{ticket.channel}</TableCell>
                      {role === 'admin' && (
                        <TableCell className="text-sm text-slate-600">{ticket.requester}</TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;