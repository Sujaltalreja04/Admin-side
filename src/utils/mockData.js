// Mock data for users and content
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    email: 'admin@example.com',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    username: 'editor',
    password: 'editor123',
    role: 'editor',
    name: 'Editor User',
    email: 'editor@example.com',
    status: 'active',
    createdAt: '2024-01-02',
  },
];

export const mockContent = [
  {
    id: 1,
    title: 'Welcome to the Admin Panel',
    type: 'article',
    author: 'Admin User',
    date: '2024-01-10',
    tags: ['Welcome', 'Admin'],
    status: 'published',
    body: 'This is the first article in the admin panel.'
  },
]; 