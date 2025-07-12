import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchBookings, updateBooking, deleteBooking } from '../utils/api';
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaEdit, FaTrash, FaPlus, FaClock } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h2`
  background: linear-gradient(45deg, #6366f1, #ec4899, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.2rem;
  margin: 0;
  font-weight: 800;
  letter-spacing: -1px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  }
`;

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const BookingCard = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 28px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #ec4899);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    background: rgba(255,255,255,0.12);
  }
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  flex: 1;
  
  .name {
    color: #f8fafc;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .contact {
    color: rgba(255,255,255,0.7);
    font-size: 0.9rem;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const BookingTime = styled.div`
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
`;

const Message = styled.div`
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  color: rgba(255,255,255,0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  border-left: 3px solid #6366f1;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'edit' 
    ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
    : 'linear-gradient(135deg, #ef4444, #dc2626)'};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${props => props.variant === 'edit' 
      ? 'rgba(245, 158, 11, 0.4)' 
      : 'rgba(239, 68, 68, 0.4)'};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const Modal = styled.div`
  background: rgba(30,41,59,0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 24px;
  padding: 32px;
  min-width: 500px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  color: #f8fafc;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h3 {
    background: linear-gradient(45deg, #6366f1, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #f8fafc;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    color: rgba(255,255,255,0.9);
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 0.95rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    color: #f8fafc;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #6366f1;
      background: rgba(255,255,255,0.15);
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
    }
    
    &::placeholder {
      color: rgba(255,255,255,0.5);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
  }
`;

const CancelButton = styled.button`
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.8);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.15);
    color: #f8fafc;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255,255,255,0.6);
  
  .icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: rgba(255,255,255,0.8);
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

function formatDateTimeSimple(dateTimeStr) {
  if (!dateTimeStr) return 'Not scheduled';
  const date = new Date(dateTimeStr.replace(' ', 'T'));
  if (isNaN(date.getTime())) return dateTimeStr;
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleString(undefined, options);
}

function toDatetimeLocalValue(dateTimeStr) {
  if (!dateTimeStr) return '';
  let d = new Date(dateTimeStr.replace(' ', 'T'));
  if (isNaN(d.getTime())) return '';
  const pad = n => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({ FULL_NAME: '', EMAIL: '', PHONE: '', MESSAGE: '', BOOKED_SLOT: '' });
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ FULL_NAME: '', EMAIL: '', PHONE: '', MESSAGE: '' });

  useEffect(() => {
    fetchBookings()
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch bookings');
        setLoading(false);
      });
  }, []);

  const handleEdit = idx => {
    setEditIdx(idx);
    let slot = bookings[idx].BOOKED_SLOT;
    let slotValue = '';
    if (slot) {
      if (Array.isArray(slot)) slot = slot[0];
      slotValue = toDatetimeLocalValue(slot);
    }
    setEditForm({ ...bookings[idx], BOOKED_SLOT: slotValue });
    setShowModal(true);
  };

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async e => {
    e.preventDefault();
    try {
      let slot = editForm.BOOKED_SLOT;
      let slotValue = slot;
      if (slot) {
        slotValue = slot.replace('T', ' ') + ':00';
      }
      await updateBooking(bookings[editIdx].ID, { ...editForm, BOOKED_SLOT: slotValue });
      const updated = [...bookings];
      updated[editIdx] = { ...editForm, ID: bookings[editIdx].ID, BOOKED_SLOT: slotValue };
      setBookings(updated);
      setShowModal(false);
    } catch {
      alert('Failed to update booking');
    }
  };

  const handleDelete = async idx => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await deleteBooking(bookings[idx].ID);
      setBookings(bookings.filter((_, i) => i !== idx));
    } catch {
      alert('Failed to delete booking');
    }
  };

  const handleAddChange = e => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSave = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm)
      });
      if (!res.ok) throw new Error('Failed to add booking');
      const data = await res.json();
      setBookings([{ ...addForm, ID: data.id }, ...bookings]);
      setShowAddModal(false);
      setAddForm({ FULL_NAME: '', EMAIL: '', PHONE: '', MESSAGE: '' });
    } catch {
      alert('Failed to add booking');
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.7)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
          <h3>Loading bookings...</h3>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '60px', color: '#ef4444' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>❌</div>
          <h3>{error}</h3>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Expert Bookings</Title>
        <AddButton onClick={() => setShowAddModal(true)}>
          <FaPlus />
          New Booking
        </AddButton>
      </Header>

      {bookings.length === 0 ? (
        <EmptyState>
          <div className="icon">📅</div>
          <h3>No bookings yet</h3>
          <p>When experts get booked, their appointments will appear here.</p>
        </EmptyState>
      ) : (
        <BookingGrid>
          {bookings.map((booking, idx) => (
            <BookingCard key={booking.ID}>
              <BookingHeader>
                <UserInfo>
                  <div className="name">
                    <FaUser style={{ color: '#6366f1' }} />
                    {booking.FULL_NAME}
                  </div>
                  <div className="contact">
                    <FaPhone style={{ color: '#ec4899' }} />
                    {booking.PHONE}
                  </div>
                  <div className="contact">
                    <FaEnvelope style={{ color: '#22c55e' }} />
                    {booking.EMAIL}
                  </div>
                </UserInfo>
                {booking.BOOKED_SLOT && (
                  <BookingTime>
                    <FaClock />
                    {formatDateTimeSimple(booking.BOOKED_SLOT)}
                  </BookingTime>
                )}
              </BookingHeader>

              {booking.MESSAGE && (
                <Message>
                  "{booking.MESSAGE}"
                </Message>
              )}

              <ActionButtons>
                <ActionButton variant="edit" onClick={() => handleEdit(idx)}>
                  <FaEdit />
                  Edit
                </ActionButton>
                <ActionButton onClick={() => handleDelete(idx)}>
                  <FaTrash />
                  Delete
                </ActionButton>
              </ActionButtons>
            </BookingCard>
          ))}
        </BookingGrid>
      )}

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <h3>Edit Booking</h3>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            <form onSubmit={handleEditSave}>
              <FormGroup>
                <label>Full Name</label>
                <input name="FULL_NAME" value={editForm.FULL_NAME} onChange={handleEditChange} required />
              </FormGroup>
              <FormGroup>
                <label>Phone</label>
                <input name="PHONE" value={editForm.PHONE} onChange={handleEditChange} required />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input name="EMAIL" value={editForm.EMAIL} onChange={handleEditChange} required />
              </FormGroup>
              <FormGroup>
                <label>Message</label>
                <textarea name="MESSAGE" value={editForm.MESSAGE} onChange={handleEditChange} required />
              </FormGroup>
              <FormGroup>
                <label>Booking Date & Time</label>
                <input
                  name="BOOKED_SLOT"
                  type="datetime-local"
                  value={editForm.BOOKED_SLOT || ''}
                  onChange={handleEditChange}
                />
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setShowModal(false)}>Cancel</CancelButton>
                <SaveButton type="submit">Save Changes</SaveButton>
              </ButtonGroup>
            </form>
          </Modal>
        </ModalOverlay>
      )}

      {showAddModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <h3>New Booking</h3>
              <CloseButton onClick={() => setShowAddModal(false)}>×</CloseButton>
            </ModalHeader>
            <form onSubmit={handleAddSave}>
              <FormGroup>
                <label>Full Name</label>
                <input name="FULL_NAME" value={addForm.FULL_NAME} onChange={handleAddChange} required />
              </FormGroup>
              <FormGroup>
                <label>Phone</label>
                <input name="PHONE" value={addForm.PHONE} onChange={handleAddChange} required />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input name="EMAIL" value={addForm.EMAIL} onChange={handleAddChange} required />
              </FormGroup>
              <FormGroup>
                <label>Message</label>
                <textarea name="MESSAGE" value={addForm.MESSAGE} onChange={handleAddChange} required />
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setShowAddModal(false)}>Cancel</CancelButton>
                <SaveButton type="submit">Create Booking</SaveButton>
              </ButtonGroup>
            </form>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default Booking;