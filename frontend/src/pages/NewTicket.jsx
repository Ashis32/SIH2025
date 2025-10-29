import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Upload, Send, MessageSquare, Mail, ArrowLeft, Sparkles } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const NewTicket = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portal');
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    type: '',
    priority: 'Medium',
    category: ''
  });
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description || !formData.type) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Ticket submitted successfully! Ticket ID: TKT-2024-006'
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatHistory([...chatHistory, 
      { type: 'user', message: chatMessage },
      { type: 'bot', message: 'Thank you for your message. I will create a ticket for you. Can you provide more details about the issue?' }
    ]);
    setChatMessage('');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Email Ticket Submitted',
      description: 'Your ticket has been created from email'
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-slate-800">Create New Ticket</h1>
        <p className="text-slate-600 mt-1">Submit your IT support request through multiple channels</p>
      </div>

      {/* Coming Soon Badge */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                AI-powered ticket routing and smart classification coming soon!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Channel Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Submission Method</CardTitle>
          <CardDescription>Select how you'd like to submit your support request</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portal">Portal Form</TabsTrigger>
              <TabsTrigger value="chatbot">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chatbot
              </TabsTrigger>
              <TabsTrigger value="email">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </TabsTrigger>
            </TabsList>

            {/* Portal Form */}
            <TabsContent value="portal" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about your issue"
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Account Access">Account Access</SelectItem>
                        <SelectItem value="Network">Network</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Hardware">Hardware</SelectItem>
                        <SelectItem value="Configuration">Configuration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Authentication">Authentication</SelectItem>
                      <SelectItem value="Network Access">Network Access</SelectItem>
                      <SelectItem value="Software Installation">Software Installation</SelectItem>
                      <SelectItem value="Hardware Issue">Hardware Issue</SelectItem>
                      <SelectItem value="Email Support">Email Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Attachments</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Chatbot */}
            <TabsContent value="chatbot" className="mt-6">
              <div className="space-y-4">
                <div className="h-96 border border-slate-200 rounded-lg p-4 overflow-y-auto bg-slate-50">
                  {chatHistory.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                        <p className="text-slate-600 font-medium">Start a conversation</p>
                        <p className="text-sm text-slate-500 mt-1">Describe your issue and I'll help you</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((chat, index) => (
                        <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-4 py-2 rounded-lg ${
                            chat.type === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white border border-slate-200 text-slate-800'
                          }`}>
                            {chat.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Email */}
            <TabsContent value="email" className="mt-6">
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email-to">To</Label>
                  <Input
                    id="email-to"
                    value="support@powergrid.com"
                    disabled
                    className="bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Subject</Label>
                  <Input
                    id="email-subject"
                    placeholder="Enter subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-body">Message</Label>
                  <Textarea
                    id="email-body"
                    placeholder="Type your message here"
                    rows={8}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTicket;