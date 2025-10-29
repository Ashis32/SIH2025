import React, { useState, useMemo } from 'react';
import { mockKnowledgeBase, mockFAQs } from '../mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Search, BookOpen, Eye, ThumbsUp, TrendingUp, HelpCircle, LockKeyhole, Wifi, FileText } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    return mockKnowledgeBase.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handleSelfService = (action) => {
    toast({
      title: 'Request Processed',
      description: `Your ${action} request has been submitted successfully`
    });
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Account Access': LockKeyhole,
      'Network Access': Wifi,
      'Email Support': FileText,
      'Software Installation': FileText,
      'Hardware Issue': FileText
    };
    return icons[category] || BookOpen;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Knowledge Base</h1>
        <p className="text-lg text-slate-600">Find answers and solutions to common IT issues</p>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src="https://images.pexels.com/photos/7709208/pexels-photo-7709208.jpeg"
          alt="Knowledge Base"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Self-Service Portal</h2>
            <p className="text-blue-100 text-lg">Instant solutions at your fingertips</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search articles, topics, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Self Service */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Self-Service Actions</CardTitle>
          <CardDescription>Resolve common issues instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center space-y-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleSelfService('Password Reset')}
            >
              <LockKeyhole className="w-8 h-8 text-blue-600" />
              <span className="font-semibold">Reset Password</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center space-y-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleSelfService('VPN Access')}
            >
              <Wifi className="w-8 h-8 text-blue-600" />
              <span className="font-semibold">Request VPN Access</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center space-y-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleSelfService('Software Installation')}
            >
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="font-semibold">Software Request</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center space-y-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleSelfService('IT Support')}
            >
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <span className="font-semibold">Get Help</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Articles */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">Popular Articles</h2>
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                <p className="text-slate-600">No articles found</p>
              </CardContent>
            </Card>
          ) : (
            filteredArticles.map((article) => {
              const Icon = getCategoryIcon(article.category);
              return (
                <Card
                  key={article.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{article.title}</h3>
                        <p className="text-sm text-slate-600 mb-3">{article.content}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views} views
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {article.helpful}% helpful
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {article.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* FAQ Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {mockFAQs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Top Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockKnowledgeBase.slice(0, 3).map((article, index) => (
                  <div key={article.id} className="flex items-start space-x-3 pb-3 border-b border-slate-100 last:border-0">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 hover:text-blue-600 cursor-pointer" onClick={() => handleArticleClick(article)}>
                        {article.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{article.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Article Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedArticle.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant="outline" className="mt-2">{selectedArticle.category}</Badge>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">{selectedArticle.content}</p>
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Step-by-step instructions:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                    <li>Navigate to the relevant section in your dashboard</li>
                    <li>Follow the on-screen instructions carefully</li>
                    <li>Complete all required fields</li>
                    <li>Submit and wait for confirmation</li>
                  </ol>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {selectedArticle.views} views
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {selectedArticle.helpful}% helpful
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KnowledgeBase;