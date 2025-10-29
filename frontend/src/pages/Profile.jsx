import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { User, Mail, Phone, Building, MapPin, Calendar, Star, Award } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Profile = () => {
  const { user, role } = useAuth();
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@powergrid.com',
    phone: '+1 (555) 123-4567',
    department: 'Information Technology',
    location: 'New York Office',
    joinDate: 'January 2023'
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved successfully'
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedbackRating === 0) {
      toast({
        title: 'Error',
        description: 'Please select a rating',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your feedback!'
    });
    setFeedbackRating(0);
    setFeedbackComment('');
  };

  const ticketStats = {
    total: 12,
    resolved: 8,
    pending: 4,
    avgResponseTime: '2.5 hours'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Profile</h1>
        <p className="text-slate-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800">{profileData.name}</h2>
              <p className="text-slate-600 mt-1">{profileData.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  {role === 'admin' ? 'IT Admin' : 'Employee'}
                </Badge>
                <Badge variant="outline">{profileData.department}</Badge>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Personal Info</TabsTrigger>
          <TabsTrigger value="stats">Activity</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="department"
                        value={profileData.department}
                        onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="joinDate"
                        value={profileData.joinDate}
                        disabled
                        className="pl-10 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Stats */}
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Statistics</CardTitle>
                <CardDescription>Your support ticket activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-slate-600">Total Tickets</p>
                      <p className="text-2xl font-bold text-slate-800">{ticketStats.total}</p>
                    </div>
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-slate-600">Resolved</p>
                      <p className="text-2xl font-bold text-slate-800">{ticketStats.resolved}</p>
                    </div>
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                    <div>
                      <p className="text-sm text-slate-600">Pending</p>
                      <p className="text-2xl font-bold text-slate-800">{ticketStats.pending}</p>
                    </div>
                    <Award className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-slate-600">Avg Response Time</p>
                      <p className="text-2xl font-bold text-slate-800">{ticketStats.avgResponseTime}</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Created ticket', detail: 'Password Reset Request', time: '2 hours ago' },
                    { action: 'Updated ticket', detail: 'VPN Access Issue', time: '1 day ago' },
                    { action: 'Closed ticket', detail: 'Software Installation', time: '3 days ago' },
                    { action: 'Submitted feedback', detail: '5-star rating', time: '5 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                        <p className="text-xs text-slate-600 mt-1">{activity.detail}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Feedback */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Experience Feedback</CardTitle>
              <CardDescription>Help us improve by sharing your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Rate Your Experience</Label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="transition-all duration-200 hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= feedbackRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {feedbackRating > 0 && (
                    <p className="text-sm text-slate-600">
                      You rated: {feedbackRating} star{feedbackRating > 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Additional Comments (Optional)</Label>
                  <textarea
                    id="comment"
                    rows={5}
                    placeholder="Share your thoughts about our support service..."
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Submit Feedback
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;