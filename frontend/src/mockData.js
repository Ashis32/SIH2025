export const mockTickets = [
  {
    id: 'TKT-2024-001',
    subject: 'Password Reset Request',
    description: 'Unable to access email account after password expiry',
    type: 'Account Access',
    priority: 'High',
    status: 'Open',
    category: 'Authentication',
    createdAt: '2024-01-15T10:30:00',
    updatedAt: '2024-01-15T10:30:00',
    assignedTo: 'John Smith',
    requester: 'Alice Johnson',
    channel: 'Email'
  },
  {
    id: 'TKT-2024-002',
    subject: 'VPN Access Not Working',
    description: 'Getting connection timeout error when trying to connect to VPN',
    type: 'Network',
    priority: 'Critical',
    status: 'In Progress',
    category: 'Network Access',
    createdAt: '2024-01-14T09:15:00',
    updatedAt: '2024-01-15T14:20:00',
    assignedTo: 'Sarah Williams',
    requester: 'Bob Chen',
    channel: 'Chatbot'
  },
  {
    id: 'TKT-2024-003',
    subject: 'Software Installation Request',
    description: 'Need Adobe Creative Suite installed for design work',
    type: 'Software',
    priority: 'Medium',
    status: 'Resolved',
    category: 'Software Installation',
    createdAt: '2024-01-13T11:45:00',
    updatedAt: '2024-01-14T16:30:00',
    assignedTo: 'Mike Davis',
    requester: 'Carol White',
    channel: 'Email'
  },
  {
    id: 'TKT-2024-004',
    subject: 'Printer Not Responding',
    description: 'Office printer on 3rd floor is not printing documents',
    type: 'Hardware',
    priority: 'Low',
    status: 'Open',
    category: 'Hardware Issue',
    createdAt: '2024-01-15T13:00:00',
    updatedAt: '2024-01-15T13:00:00',
    assignedTo: null,
    requester: 'David Brown',
    channel: 'Portal'
  },
  {
    id: 'TKT-2024-005',
    subject: 'Email Client Configuration',
    description: 'Need help setting up Outlook on new laptop',
    type: 'Configuration',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Email Support',
    createdAt: '2024-01-15T08:30:00',
    updatedAt: '2024-01-15T12:00:00',
    assignedTo: 'John Smith',
    requester: 'Emma Wilson',
    channel: 'Phone'
  }
];

export const mockKnowledgeBase = [
  {
    id: 'KB-001',
    title: 'How to Reset Your Password',
    category: 'Account Access',
    content: 'Step-by-step guide to reset your password using the self-service portal.',
    tags: ['password', 'reset', 'account'],
    views: 1250,
    helpful: 98,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'KB-002',
    title: 'VPN Connection Setup Guide',
    category: 'Network Access',
    content: 'Complete instructions for configuring VPN access on Windows and Mac.',
    tags: ['vpn', 'network', 'remote'],
    views: 890,
    helpful: 87,
    lastUpdated: '2024-01-12'
  },
  {
    id: 'KB-003',
    title: 'Email Configuration on Mobile Devices',
    category: 'Email Support',
    content: 'How to configure corporate email on iOS and Android devices.',
    tags: ['email', 'mobile', 'outlook'],
    views: 756,
    helpful: 92,
    lastUpdated: '2024-01-08'
  },
  {
    id: 'KB-004',
    title: 'Software Installation Requests',
    category: 'Software Installation',
    content: 'Process for requesting new software installations and licenses.',
    tags: ['software', 'installation', 'license'],
    views: 654,
    helpful: 85,
    lastUpdated: '2024-01-14'
  },
  {
    id: 'KB-005',
    title: 'Troubleshooting Printer Issues',
    category: 'Hardware Issue',
    content: 'Common printer problems and their solutions.',
    tags: ['printer', 'hardware', 'troubleshoot'],
    views: 432,
    helpful: 78,
    lastUpdated: '2024-01-09'
  }
];

export const mockAnalytics = {
  totalTickets: 145,
  openTickets: 42,
  inProgressTickets: 28,
  resolvedTickets: 75,
  avgResolutionTime: '4.2 hours',
  satisfactionRate: 92,
  ticketsByCategory: [
    { category: 'Account Access', count: 35 },
    { category: 'Network Access', count: 28 },
    { category: 'Software Installation', count: 25 },
    { category: 'Hardware Issue', count: 22 },
    { category: 'Email Support', count: 20 },
    { category: 'Other', count: 15 }
  ],
  ticketsByPriority: [
    { priority: 'Critical', count: 12 },
    { priority: 'High', count: 38 },
    { priority: 'Medium', count: 65 },
    { priority: 'Low', count: 30 }
  ],
  ticketTrend: [
    { month: 'Jul', count: 12 },
    { month: 'Aug', count: 18 },
    { month: 'Sep', count: 22 },
    { month: 'Oct', count: 28 },
    { month: 'Nov', count: 35 },
    { month: 'Dec', count: 30 }
  ]
};

export const mockFAQs = [
  {
    id: 'FAQ-001',
    question: 'How do I reset my password?',
    answer: 'Click on the "Forgot Password" link on the login page and follow the instructions sent to your registered email.'
  },
  {
    id: 'FAQ-002',
    question: 'How do I request VPN access?',
    answer: 'Submit a ticket through the portal selecting "VPN Access" as the request type. Your manager approval will be required.'
  },
  {
    id: 'FAQ-003',
    question: 'How long does software installation take?',
    answer: 'Standard software installations are typically completed within 24-48 hours of approval.'
  },
  {
    id: 'FAQ-004',
    question: 'Who do I contact for urgent issues?',
    answer: 'For critical issues, mark your ticket as "Critical" priority or call the IT helpdesk at ext. 5555.'
  }
];