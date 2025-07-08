import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaSearch,
  FaFileAlt,
  FaImage,
  FaVideo,
  FaCalendar,
  FaUser,
  FaTag
} from 'react-icons/fa';

const Container = styled.div`
  max-width: 100%;
  padding: 32px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.h1`
  color: #14532d;
  margin: 0;
  font-size: 2.1rem;
  font-weight: 700;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.05rem;
  box-shadow: 0 2px 10px rgba(34, 197, 94, 0.08);
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.18);
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  align-items: center;
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  
  input {
    width: 100%;
    padding: 12px 15px 12px 45px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }
`;

const FilterSelect = styled.select`
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 28px;
  margin-bottom: 30px;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);
  overflow: hidden;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ContentImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const ContentBody = styled.div`
  padding: 20px;
`;

const ContentTitle = styled.h3`
  color: #333;
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  line-height: 1.4;
`;

const ContentExcerpt = styled.p`
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ContentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #999;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ContentTags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #f0f0f0;
  color: #666;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &.view {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a6fd8;
    }
  }
  
  &.edit {
    background: #f39c12;
    color: white;
    
    &:hover {
      background: #e67e22;
    }
  }
  
  &.delete {
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
    }
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  .icon {
    font-size: 2rem;
    color: #667eea;
    margin-bottom: 15px;
  }
  
  .number {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }
  
  .label {
    color: #666;
    font-size: 0.9rem;
  }
`;

function SiteContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const contentItems = [
    {
      id: 1,
      title: 'Getting Started with React Development',
      excerpt: 'Learn the fundamentals of React development including components, state management, and hooks. This comprehensive guide will help you build modern web applications.',
      type: 'article',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      tags: ['React', 'JavaScript', 'Web Development'],
      status: 'published'
    },
    {
      id: 2,
      title: 'Advanced Node.js Patterns',
      excerpt: 'Explore advanced patterns and best practices for Node.js development. From design patterns to performance optimization techniques.',
      type: 'tutorial',
      author: 'Mike Chen',
      date: '2024-01-12',
      tags: ['Node.js', 'Backend', 'Performance'],
      status: 'published'
    },
    {
      id: 3,
      title: 'CSS Grid Layout Mastery',
      excerpt: 'Master CSS Grid Layout with practical examples and real-world use cases. Learn how to create responsive layouts efficiently.',
      type: 'article',
      author: 'Emily Davis',
      date: '2024-01-10',
      tags: ['CSS', 'Grid', 'Layout'],
      status: 'draft'
    },
    {
      id: 4,
      title: 'Database Design Principles',
      excerpt: 'Essential database design principles for scalable applications. Learn about normalization, indexing, and query optimization.',
      type: 'guide',
      author: 'David Wilson',
      date: '2024-01-08',
      tags: ['Database', 'SQL', 'Design'],
      status: 'published'
    },
    {
      id: 5,
      title: 'API Security Best Practices',
      excerpt: 'Comprehensive guide to securing your APIs. Learn about authentication, authorization, and common security vulnerabilities.',
      type: 'article',
      author: 'Lisa Brown',
      date: '2024-01-05',
      tags: ['Security', 'API', 'Authentication'],
      status: 'published'
    },
    {
      id: 6,
      title: 'Mobile App Development with React Native',
      excerpt: 'Build cross-platform mobile applications using React Native. From setup to deployment, everything you need to know.',
      type: 'tutorial',
      author: 'Alex Thompson',
      date: '2024-01-03',
      tags: ['React Native', 'Mobile', 'Cross-platform'],
      status: 'draft'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article':
        return <FaFileAlt />;
      case 'tutorial':
        return <FaVideo />;
      case 'guide':
        return <FaImage />;
      default:
        return <FaFileAlt />;
    }
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: contentItems.length,
    published: contentItems.filter(item => item.status === 'published').length,
    drafts: contentItems.filter(item => item.status === 'draft').length,
    articles: contentItems.filter(item => item.type === 'article').length
  };

  return (
    <Container>
      <Header>
        <Title>Site Content</Title>
        <AddButton>
          <FaPlus />
          Add New Content
        </AddButton>
      </Header>

      <StatsSection>
        <StatCard>
          <div className="icon">
            <FaFileAlt />
          </div>
          <div className="number">{stats.total}</div>
          <div className="label">Total Content</div>
        </StatCard>
        <StatCard>
          <div className="icon">
            <FaEye />
          </div>
          <div className="number">{stats.published}</div>
          <div className="label">Published</div>
        </StatCard>
        <StatCard>
          <div className="icon">
            <FaEdit />
          </div>
          <div className="number">{stats.drafts}</div>
          <div className="label">Drafts</div>
        </StatCard>
        <StatCard>
          <div className="icon">
            <FaTag />
          </div>
          <div className="number">{stats.articles}</div>
          <div className="label">Articles</div>
        </StatCard>
      </StatsSection>

      <SearchBar>
        <SearchInput>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        <FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="article">Articles</option>
          <option value="tutorial">Tutorials</option>
          <option value="guide">Guides</option>
        </FilterSelect>
      </SearchBar>

      <ContentGrid>
        {filteredContent.map(item => (
          <ContentCard key={item.id}>
            <ContentImage>
              {getTypeIcon(item.type)}
            </ContentImage>
            <ContentBody>
              <ContentTitle>{item.title}</ContentTitle>
              <ContentExcerpt>{item.excerpt}</ContentExcerpt>
              
              <ContentMeta>
                <MetaItem>
                  <FaUser />
                  {item.author}
                </MetaItem>
                <MetaItem>
                  <FaCalendar />
                  {new Date(item.date).toLocaleDateString()}
                </MetaItem>
              </ContentMeta>
              
              <ContentTags>
                {item.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ContentTags>
              
              <ActionButtons>
                <ActionButton className="view">
                  <FaEye />
                  View
                </ActionButton>
                <ActionButton className="edit">
                  <FaEdit />
                  Edit
                </ActionButton>
                <ActionButton className="delete">
                  <FaTrash />
                  Delete
                </ActionButton>
              </ActionButtons>
            </ContentBody>
          </ContentCard>
        ))}
      </ContentGrid>
    </Container>
  );
}

export default SiteContent; 