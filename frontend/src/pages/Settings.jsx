import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Bell, Shield, Palette, Globe, Database, Zap } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    ticketUpdates: true,
    weeklyDigest: true,
    language: 'en',
    timezone: 'utc',
    theme: 'light'
  });

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully'
    });
  };

  const handleComingSoon = (feature) => {
    toast({
      title: 'Coming Soon',
      description: `${feature} integration will be available in the next update`
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your application preferences</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Configure how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-slate-500">Receive email alerts for important updates</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-slate-500">Get instant browser notifications</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ticket Status Updates</Label>
              <p className="text-sm text-slate-500">Notify when ticket status changes</p>
            </div>
            <Switch
              checked={settings.ticketUpdates}
              onCheckedChange={(checked) => setSettings({ ...settings, ticketUpdates: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Digest</Label>
              <p className="text-sm text-slate-500">Receive weekly summary of your tickets</p>
            </div>
            <Switch
              checked={settings.weeklyDigest}
              onCheckedChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-blue-600" />
            <CardTitle>Preferences</CardTitle>
          </div>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
              <SelectTrigger id="language">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                <SelectItem value="est">EST (GMT-5)</SelectItem>
                <SelectItem value="pst">PST (GMT-8)</SelectItem>
                <SelectItem value="ist">IST (GMT+5:30)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Active Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Coming Soon - Integrations */}
      <Card className="border-dashed border-2 border-slate-300">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-slate-400" />
            <CardTitle className="text-slate-600">Backend Integrations</CardTitle>
          </div>
          <CardDescription>Connect with enterprise systems (Coming Soon)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start text-slate-600"
            onClick={() => handleComingSoon('GLPI')}
          >
            <Database className="w-4 h-4 mr-2" />
            GLPI Integration
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-slate-600"
            onClick={() => handleComingSoon('SAP Solman')}
          >
            <Database className="w-4 h-4 mr-2" />
            SAP Solman Integration
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-slate-600"
            onClick={() => handleComingSoon('ServiceNow')}
          >
            <Database className="w-4 h-4 mr-2" />
            ServiceNow Integration
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;