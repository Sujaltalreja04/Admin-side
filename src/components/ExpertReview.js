import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUser, FaEnvelope, FaPhone, FaCommentDots } from 'react-icons/fa';
import { fetchReviews, addReview, updateReview, deleteReview } from '../utils/api';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin: 0;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  width: 250px;
  
  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Th = styled.th`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
`;

const Tr = styled.tr`
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  margin-right: 5px;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f0f0;
  }
`;

const EditButton = styled(ActionButton)`
  color: #22c55e;
`;

const DeleteButton = styled(ActionButton)`
  color: #e74c3c;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.4rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
  }
`;

const CancelButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a6268;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #e74c3c;
  font-size: 16px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;

function ExpertReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    FULL_NAME: '',
    PHONE: '',
    EMAIL: '',
    MESSAGE: '',
    EXPERT_ID: ''
  });

  useEffect(() => {
    fetchReviewsData();
  }, []);

  const fetchReviewsData = async () => {
    try {
      setLoading(true);
      const data = await fetchReviews();
      setReviews(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = () => {
    setEditingReview(null);
    setFormData({
      FULL_NAME: '',
      PHONE: '',
      EMAIL: '',
      MESSAGE: '',
      EXPERT_ID: ''
    });
    setShowModal(true);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setFormData({
      FULL_NAME: review.FULL_NAME || '',
      PHONE: review.PHONE || '',
      EMAIL: review.EMAIL || '',
      MESSAGE: review.MESSAGE || '',
      EXPERT_ID: review.EXPERT_ID || ''
    });
    setShowModal(true);
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(id);
        await fetchReviewsData();
      } catch (err) {
        setError('Failed to delete review');
        console.error('Error deleting review:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await updateReview(editingReview.USER_ID, formData);
      } else {
        await addReview(formData);
      }
      setShowModal(false);
      await fetchReviewsData();
    } catch (err) {
      setError(editingReview ? 'Failed to update review' : 'Failed to add review');
      console.error('Error saving review:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredReviews = reviews.filter(review =>
    review.FULL_NAME?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.EMAIL?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.MESSAGE?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.EXPERT_ID?.toString().includes(searchTerm)
  );

  if (loading) {
    return <LoadingMessage>Loading reviews...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Header>
        <Title>Expert Reviews</Title>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <SearchContainer>
            <FaSearch style={{ color: '#666' }} />
            <SearchInput
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <AddButton onClick={handleAddReview}>
            <FaPlus />
            Add Review
          </AddButton>
        </div>
      </Header>

      {filteredReviews.length === 0 ? (
        <EmptyMessage>
          {searchTerm ? 'No reviews found matching your search.' : 'No reviews available.'}
        </EmptyMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Full Name</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
              <Th>Message</Th>
              <Th>Expert ID</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map(review => (
              <Tr key={review.USER_ID}>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaUser style={{ color: '#666' }} />
                    {review.FULL_NAME}
                  </div>
                </Td>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaPhone style={{ color: '#666' }} />
                    {review.PHONE || <span style={{ color: '#aaa' }}>N/A</span>}
                  </div>
                </Td>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaEnvelope style={{ color: '#666' }} />
                    {review.EMAIL || <span style={{ color: '#aaa' }}>N/A</span>}
                  </div>
                </Td>
                <Td>
                  <div style={{ maxWidth: '300px', wordWrap: 'break-word', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaCommentDots style={{ color: '#666' }} />
                    {review.MESSAGE}
                  </div>
                </Td>
                <Td>{review.EXPERT_ID}</Td>
                <Td>
                  <EditButton onClick={() => handleEditReview(review)}>
                    <FaEdit />
                  </EditButton>
                  <DeleteButton onClick={() => handleDeleteReview(review.USER_ID)}>
                    <FaTrash />
                  </DeleteButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="FULL_NAME"
                  value={formData.FULL_NAME}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full name"
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  name="PHONE"
                  value={formData.PHONE}
                  onChange={handleInputChange}
                  placeholder="Enter phone number (optional)"
                />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="EMAIL"
                  value={formData.EMAIL}
                  onChange={handleInputChange}
                  placeholder="Enter email (optional)"
                />
              </FormGroup>

              <FormGroup>
                <Label>Message</Label>
                <TextArea
                  name="MESSAGE"
                  value={formData.MESSAGE}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter review message"
                />
              </FormGroup>

              <FormGroup>
                <Label>Expert ID</Label>
                <Input
                  type="number"
                  name="EXPERT_ID"
                  value={formData.EXPERT_ID}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter expert ID"
                />
              </FormGroup>

              <ButtonGroup>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit">
                  {editingReview ? 'Update Review' : 'Add Review'}
                </SaveButton>
              </ButtonGroup>
            </Form>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default ExpertReview; 