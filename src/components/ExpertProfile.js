import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEdit, 
  FaSave,
  FaTimes,
  FaStar,
  FaGraduationCap,
  FaBriefcase,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaPlus
} from 'react-icons/fa';
import { fetchExperts, addExpert, updateExpert, deleteExpert, addWorkExperience, fetchWorkExperience, updateWorkExperience, deleteWorkExperience, addTimeSlots, fetchTimeSlots, updateTimeSlot, deleteTimeSlot } from '../utils/api';
import { format, subDays, isSameDay, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format as formatDateFns } from 'date-fns';

const Container = styled.div`
  max-width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgb(117, 81, 81);
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 2rem;
`;

const EditButton = styled.button`
  background: linear-gradient(135deg,rgb(37, 39, 50) 0%, #764ba2 100%);
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
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  margin-bottom: 30px;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 3rem;
  font-weight: bold;
`;

const ExpertName = styled.h2`
  color: #333;
  margin: 0 0 10px 0;
  font-size: 1.5rem;
`;

const ExpertTitle = styled.p`
  color: #16a34a;
  font-weight: 600;
  margin: 0 0 15px 0;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  
  .stars {
    color: #ffd700;
  }
  
  .rating-text {
    color: #666;
    font-weight: 600;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 0.9rem;
  
  .icon {
    color: #667eea;
    width: 16px;
  }
`;

const DetailsCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  color: #14532d;
  margin: 32px 0 18px 0;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  .icon {
    color: #22c55e;
    font-size: 1.2em;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
`;

const Label = styled.label`
  color: #222;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 2px;
`;

const Input = styled.input`
  padding: 14px 18px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1.05rem;
  background: #f8f9fa;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #22c55e;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.08);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const SaveButton = styled.button`
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
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
  }
`;

const CancelButton = styled.button`
  background: #e74c3c;
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
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
`;

const SocialButton = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const AddExpertButton = styled.button`
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
  margin-left: 15px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const Modal = styled.div`
  background: white;
  padding: 40px 48px;
  border-radius: 20px;
  min-width: 500px;
  max-width: 700px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
  @media (max-width: 600px) {
    min-width: 90vw;
    padding: 20px 8px;
  }
`;
const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
`;

// Add styled-components for the table
const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 32px 0 24px 0;
`;

const Table = styled.table`
  width: 95%;
  max-width: 1100px;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  overflow: hidden;
  margin: 0 auto;
  font-size: 1rem;
  @media (max-width: 900px) {
    width: 100%;
    font-size: 0.95rem;
  }
`;
const Th = styled.th`
  background:rgb(255, 255, 255);
  color: #14532d;
  font-weight: 700;
  padding: 18px 16px;
  text-align: left;
  font-size: 1.05rem;
  border-bottom: 2px solid #e1e5e9;
`;
const Td = styled.td`
  padding: 8px 16px;
  border-bottom: 1px solidrgb(238, 238, 238);
  color: #222;
  font-size: 1rem;
  vertical-align: middle;
  white-space: nowrap;
  
  &:first-child {
    padding-left: 24px;
  }
`;
const Tr = styled.tr`
  &:hover {
    background:rgba(209, 201, 40, 0.37);
    transition: background 0.2s;
  }
`;
const ViewButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #14532d;
    color: #fff;
  }
`;

const ProfileImageCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 120px;
  padding: 8px 0;

  .image-container {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
    border: 2px solid #e1e5e9;
    display: block;
  }

  .expert-id {
    color: #666;
    font-size: 0.85rem;
    font-weight: 600;
    width: 35px;
    flex-shrink: 0;
  }
`;

const DefaultProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

// Add DeleteButton styled component
const DeleteButton = styled.button`
  background: linear-gradient(135deg, #e53935 0%, #e35d5b 100%);
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
  margin-left: 8px;
  &:hover {
    background: #b71c1c;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(229, 57, 53, 0.2);
  }
`;

function ExpertProfile() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [editExpert, setEditExpert] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());
  const [newExpert, setNewExpert] = useState({
    IMAGE: '',
    NAME: '',
    PHONE: '',
    EMAIL: '',
    TITLE: '',
    CATEGORY: '',
    LOCATION: '',
    EXPERTISE: '',
    SPECIALTIES: '',
    EXPERIENCE: '',
    REVIEWS: '',
    RATING: '',
    HOURLY_RATE: '',
    AVAILABILITY: '',
    RESPONSE_TIME: '',
    AGE: '',
    DESCRIPTION: '',
    ON_SITE_VISIT_FEES: ''
  });
  const [workExperience, setWorkExperience] = useState({
    JOB_TITLE: '',
    COMPANY_NAME: '',
    START_DATE: '',
    END_DATE: '',
    DESCRIPTION: ''
  });
  const [editWorkExperiences, setEditWorkExperiences] = useState([]);
  const [viewWorkExperiences, setViewWorkExperiences] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotDate, setSlotDate] = useState(null);
  const [slotLabel, setSlotLabel] = useState('');
  const [viewTimeSlots, setViewTimeSlots] = useState([]);
  const [editTimeSlots, setEditTimeSlots] = useState([]);
  const [newEditSlotDate, setNewEditSlotDate] = useState(null);
  const [newEditSlotLabel, setNewEditSlotLabel] = useState('');
  const [deletedSlotIds, setDeletedSlotIds] = useState([]);

  useEffect(() => {
    fetchExperts()
      .then(data => {
        console.log('Fetched experts:', data); // Debug log
        setExperts(data);
      })
      .catch(() => setError('Failed to fetch experts'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (editExpert && editExpert.ID) {
      fetchWorkExperience(editExpert.ID)
        .then(data => setEditWorkExperiences(data || []))
        .catch(() => setEditWorkExperiences([]));
    } else {
      setEditWorkExperiences([]);
    }
  }, [editExpert]);

  // Fetch time slots for the expert in edit modal
  useEffect(() => {
    if (editExpert && editExpert.ID) {
      fetchTimeSlots(editExpert.ID)
        .then(data => setEditTimeSlots(data || []))
        .catch(() => setEditTimeSlots([]));
    } else {
      setEditTimeSlots([]);
    }
  }, [editExpert]);

  const handleAddExpert = async (e) => {
    e.preventDefault();
    try {
      // 1. Add expert as before
      const response = await addExpert(newExpert);
      const expertId = response.id;
      // 2. Add work experience for this expert
      await addWorkExperience({
        EXPERT_ID: expertId,
        JOB_TITLE: workExperience.JOB_TITLE,
        COMPANY_NAME: workExperience.COMPANY_NAME,
        START_DATE: formatDate(workExperience.START_DATE),
        END_DATE: formatDate(workExperience.END_DATE),
        DESCRIPTION: workExperience.DESCRIPTION
      });
      // 3. Add time slots for this expert
      if (timeSlots.length > 0) {
        console.log('Adding time slots:', timeSlots); // Debug log
        // Validate and format time slots before sending
        const formattedSlots = timeSlots.map(slot => ({
          AVAILABLE_DATE: slot.AVAILABLE_DATE || null,
          AVAILABLE_TIME: slot.AVAILABLE_TIME || null,
          SLOT_LABEL: slot.SLOT_LABEL || '',
          IS_BOOKED: slot.IS_BOOKED || 0
        })).filter(slot => slot.AVAILABLE_DATE && slot.AVAILABLE_TIME); // Only send slots with valid date and time
        
        console.log('Formatted time slots:', formattedSlots); // Debug log
        
        if (formattedSlots.length > 0) {
          await addTimeSlots(expertId, formattedSlots);
        }
      }
      setShowAddModal(false);
      setNewExpert({ IMAGE: '', NAME: '', PHONE: '', EMAIL: '', TITLE: '', CATEGORY: '', LOCATION: '', EXPERTISE: '', SPECIALTIES: '', EXPERIENCE: '', REVIEWS: '', RATING: '', HOURLY_RATE: '', AVAILABILITY: '', RESPONSE_TIME: '', AGE: '', DESCRIPTION: '', ON_SITE_VISIT_FEES: '' });
      setWorkExperience({ JOB_TITLE: '', COMPANY_NAME: '', START_DATE: '', END_DATE: '', DESCRIPTION: '' });
      setTimeSlots([]);
      setLoading(true);
      const updated = await fetchExperts();
      setExperts(updated);
    } catch (err) {
      console.error('Add expert error:', err); // Debug log
      setError('Failed to add expert');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setEditExpert(selectedExpert);
    console.log('handleEdit called for expert:', selectedExpert);
    if (selectedExpert && selectedExpert.ID) {
      try {
        const workExpArr = await fetchWorkExperience(selectedExpert.ID);
        console.log('Fetched work experiences:', workExpArr);
        setEditWorkExperiences(workExpArr || []);
        
        // Fetch time slots for editing
        const timeSlotsArr = await fetchTimeSlots(selectedExpert.ID);
        console.log('Fetched time slots for editing:', timeSlotsArr);
        setEditTimeSlots(timeSlotsArr || []);
      } catch (err) {
        console.log('Error fetching work experiences:', err);
        setEditWorkExperiences([]);
        setEditTimeSlots([]);
      }
    } else {
      setEditWorkExperiences([]);
      setEditTimeSlots([]);
    }
  };

  const handleEditChange = (e) => setEditExpert({ ...editExpert, [e.target.name]: e.target.value });
  const handleEditWorkExperienceChange = (idx, e) => {
    const updated = [...editWorkExperiences];
    updated[idx] = { ...updated[idx], [e.target.name]: e.target.value };
    setEditWorkExperiences(updated);
  };

  const handleAddWorkExperienceRow = () => {
    setEditWorkExperiences(prev => [
      ...prev,
      { JOB_TITLE: '', COMPANY_NAME: '', START_DATE: '', END_DATE: '', DESCRIPTION: '', EXPERIENCE_ID: null, EXPERT_ID: editExpert.ID }
    ]);
  };

  const handleDeleteWorkExperienceRow = async (idx) => {
    const exp = editWorkExperiences[idx];
    if (exp.EXPERIENCE_ID) {
      await deleteWorkExperience(exp.EXPERIENCE_ID);
    }
    const updated = editWorkExperiences.filter((_, i) => i !== idx);
    setEditWorkExperiences(updated);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.slice(0, 10); // Ensures only YYYY-MM-DD is sent
  };

  // Helper to format date and time for MySQL
  const formatSlotDate = (dateObj) => {
    if (!dateObj) return '';
    // Use local date to avoid timezone issues
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const formatSlotTime = (dateObj) => {
    if (!dateObj) return '';
    // Use local time to avoid timezone issues
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSaveEdit = async () => {
    if (!editExpert || !editExpert.ID) {
      console.error('No editExpert or missing ID:', editExpert);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await updateExpert(editExpert.ID, editExpert);
      // Save all work experiences
      for (const exp of editWorkExperiences) {
        if (exp.EXPERIENCE_ID) {
          await updateWorkExperience(exp.EXPERIENCE_ID, {
            JOB_TITLE: exp.JOB_TITLE,
            COMPANY_NAME: exp.COMPANY_NAME,
            START_DATE: formatDate(exp.START_DATE),
            END_DATE: formatDate(exp.END_DATE),
            DESCRIPTION: exp.DESCRIPTION
          });
        } else if (exp.JOB_TITLE || exp.START_DATE || exp.END_DATE || exp.DESCRIPTION) {
          await addWorkExperience({
            EXPERT_ID: editExpert.ID,
            JOB_TITLE: exp.JOB_TITLE,
            COMPANY_NAME: exp.COMPANY_NAME,
            START_DATE: formatDate(exp.START_DATE),
            END_DATE: formatDate(exp.END_DATE),
            DESCRIPTION: exp.DESCRIPTION
          });
        }
      }
      // Save all time slots
      console.log('Saving time slots:', editTimeSlots); // Debug log
      console.log('Deleted slot IDs:', deletedSlotIds); // Debug log
      
      for (const slot of editTimeSlots) {
        console.log('Processing slot for save:', slot); // Debug log
        
        if (slot.SLOT_ID && deletedSlotIds.includes(slot.SLOT_ID)) {
          console.log('Skipping deleted slot:', slot.SLOT_ID); // Debug log
          continue;
        }
        
        if (slot.SLOT_ID) {
          const dateObj = getSlotDate(slot);
          console.log('Updating existing slot:', slot.SLOT_ID, 'with date obj:', dateObj); // Debug log
          
          if (dateObj) {
            await updateTimeSlot(slot.SLOT_ID, {
              AVAILABLE_DATE: formatSlotDate(dateObj),
              AVAILABLE_TIME: formatSlotTime(dateObj),
              SLOT_LABEL: slot.SLOT_LABEL || '',
              IS_BOOKED: slot.IS_BOOKED || 0
            });
          } else {
            console.log('Skipping slot with invalid date:', slot.SLOT_ID); // Debug log
          }
        } else if (slot.AVAILABLE_DATE && slot.AVAILABLE_TIME) {
          const dateObj = getSlotDate(slot);
          console.log('Adding new slot with date obj:', dateObj); // Debug log
          
          if (dateObj) {
            await addTimeSlots(editExpert.ID, [{
              AVAILABLE_DATE: formatSlotDate(dateObj),
              AVAILABLE_TIME: formatSlotTime(dateObj),
              SLOT_LABEL: slot.SLOT_LABEL || '',
              IS_BOOKED: slot.IS_BOOKED || 0
            }]);
          } else {
            console.log('Skipping new slot with invalid date'); // Debug log
          }
        } else {
          console.log('Skipping invalid slot:', slot); // Debug log
        }
      }
      // Refresh work experiences and slots after save for the current expert
      const refreshed = await fetchWorkExperience(editExpert.ID);
      setEditWorkExperiences(refreshed || []);
      const refreshedSlots = await fetchTimeSlots(editExpert.ID);
      setEditTimeSlots(refreshedSlots || []);
      setEditExpert(null);
      setSelectedExpert(null);
      const updated = await fetchExperts();
      setExperts(updated);
      if (selectedExpert && selectedExpert.ID === editExpert.ID) {
        fetchWorkExperience(selectedExpert.ID)
          .then(data => setViewWorkExperiences(data))
          .catch(() => setViewWorkExperiences([]));
        fetchTimeSlots(selectedExpert.ID)
          .then(data => setViewTimeSlots(data))
          .catch(() => setViewTimeSlots([]));
      }
      // After save, clear deletedSlotIds
      setDeletedSlotIds([]);
    } catch (err) {
      setError('Failed to update expert');
      console.error('Update expert error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderProfileImage = (expert) => {
    console.log(`Rendering image for expert ${expert.ID}:`, expert.IMAGE); // Debug log
    
    if (!expert.IMAGE || failedImages.has(expert.ID)) {
      return (
        <DefaultProfileImage>
          {expert.NAME ? expert.NAME.charAt(0).toUpperCase() : 'E'}
        </DefaultProfileImage>
      );
    }

    return (
      <img 
        src={expert.IMAGE}
        alt={`${expert.NAME}'s profile`}
        onError={() => {
          console.log(`Image load failed for expert ${expert.ID}`); // Debug log
          setFailedImages(prev => new Set([...prev, expert.ID]));
        }}
      />
    );
  };

  const getCategoryData = () => {
    const counts = {};
    experts.forEach(expert => {
      const cat = expert.CATEGORY || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };
  const categoryData = getCategoryData();

  const getNewExpertsData = () => {
    // Get the last 7 days as labels
    const days = Array.from({ length: 7 }).map((_, i) =>
      format(subDays(new Date(), 6 - i), 'EEE')
    );
    // Count experts per day
    return days.map((dayLabel, i) => {
      const dayDate = subDays(new Date(), 6 - i);
      const count = experts.filter(expert => {
        if (!expert.CREATED_AT) return false;
        // Parse date, handle both string and Date
        const regDate = typeof expert.CREATED_AT === 'string'
          ? parseISO(expert.CREATED_AT)
          : expert.CREATED_AT;
        return isSameDay(regDate, dayDate);
      }).length;
      return { date: dayLabel, experts: count };
    });
  };
  const newExpertsData = getNewExpertsData();

  useEffect(() => {
    if (selectedExpert && selectedExpert.ID) {
      fetchWorkExperience(selectedExpert.ID)
        .then(data => setViewWorkExperiences(data))
        .catch(() => setViewWorkExperiences([]));
    } else {
      setViewWorkExperiences([]);
    }
  }, [selectedExpert]);

  // Fetch time slots for the selected expert in the view modal
  useEffect(() => {
    if (selectedExpert && selectedExpert.ID) {
      fetchTimeSlots(selectedExpert.ID)
        .then(data => setViewTimeSlots(data))
        .catch(() => setViewTimeSlots([]));
    } else {
      setViewTimeSlots([]);
    }
  }, [selectedExpert]);

  // Add debug log before rendering work experience rows in the edit form
  console.log('Rendering editWorkExperiences:', editWorkExperiences);

  // Helper to safely parse slot date and time
  const getSlotDate = (slot) => {
    console.log('getSlotDate called with slot:', slot); // Debug log
    
    if (!slot || !slot.AVAILABLE_DATE || !slot.AVAILABLE_TIME) {
      console.log('getSlotDate returning null - missing data'); // Debug log
      return null;
    }
    
    const dateTimeString = `${slot.AVAILABLE_DATE}T${slot.AVAILABLE_TIME}`;
    console.log('getSlotDate dateTimeString:', dateTimeString); // Debug log
    
    const dateObj = new Date(dateTimeString);
    if (isNaN(dateObj.getTime())) {
      console.log('getSlotDate returning null - invalid date'); // Debug log
      return null;
    }
    
    console.log('getSlotDate returning date obj:', dateObj); // Debug log
    return dateObj;
  };

  return (
    <Container>
      <Header>
        <Title>Expert List</Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AddExpertButton onClick={() => setShowAddModal(true)}><FaPlus /> Add Expert</AddExpertButton>
        </div>
      </Header>
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <TableWrapper>
          {experts.length === 0 ? <p>No experts found.</p> : (
            <Table>
              <thead>
                <Tr>
                  <Th>Profile Image</Th>
                  <Th>Name</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Rating</Th>
                  <Th>Location</Th>
                  <Th>Full Profile</Th>
                </Tr>
              </thead>
              <tbody>
                {experts.map(expert => (
                  <Tr key={expert.ID}>
                    <Td>
                      <ProfileImageCell>
                        <div className="expert-id">#{expert.ID}</div>
                        <div className="image-container">
                          {renderProfileImage(expert)}
                        </div>
                      </ProfileImageCell>
                    </Td>
                    <Td>{expert.NAME}</Td>
                    <Td>{expert.TITLE}</Td>
                    <Td>{expert.CATEGORY}</Td>
                    <Td>{expert.RATING}</Td>
                    <Td>{expert.LOCATION}</Td>
                    <Td>
                      <ViewButton onClick={() => { setSelectedExpert(expert); setEditExpert(null); }}>View</ViewButton>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
        </TableWrapper>
      )}
      {selectedExpert && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Expert Profile</ModalTitle>
            {editExpert ? (
              <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }} style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                padding: 32,
                maxWidth: 1200,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 24
              }}>
                <h2 style={{ margin: '0 0 24px 0', fontWeight: 700, fontSize: '2.2rem', textAlign: 'left' }}>Edit Expert Profile</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="IMAGE" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Profile Image URL</label>
                    <input name="IMAGE" value={editExpert.IMAGE} onChange={handleEditChange} placeholder="https://example.com/image.jpg" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="NAME" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Name</label>
                    <input name="NAME" value={editExpert.NAME} onChange={handleEditChange} placeholder="Full Name" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="EMAIL" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Email</label>
                    <input name="EMAIL" value={editExpert.EMAIL || ''} onChange={handleEditChange} placeholder="Email Address" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="PHONE" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Phone</label>
                    <input name="PHONE" value={editExpert.PHONE || ''} onChange={handleEditChange} placeholder="Phone Number" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="TITLE" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Title</label>
                    <input name="TITLE" value={editExpert.TITLE} onChange={handleEditChange} placeholder="Title (e.g. Senior Developer)" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="CATEGORY" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Category</label>
                    <input name="CATEGORY" value={editExpert.CATEGORY} onChange={handleEditChange} placeholder="Category (e.g. IT, Finance)" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="EXPERTISE" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Expertise</label>
                    <input name="EXPERTISE" value={editExpert.EXPERTISE} onChange={handleEditChange} placeholder="Expertise (e.g. React, Node.js)" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="SPECIALTIES" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Specialties</label>
                    <input name="SPECIALTIES" value={editExpert.SPECIALTIES} onChange={handleEditChange} placeholder="Specialties" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="EXPERIENCE" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Experience</label>
                    <input name="EXPERIENCE" value={editExpert.EXPERIENCE} onChange={handleEditChange} placeholder="Years of Experience" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="REVIEWS" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Reviews</label>
                    <input name="REVIEWS" value={editExpert.REVIEWS} onChange={handleEditChange} placeholder="Number of Reviews" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="RATING" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Rating</label>
                    <input name="RATING" value={editExpert.RATING} onChange={handleEditChange} placeholder="Rating (e.g. 4.8)" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="HOURLY_RATE" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Hourly Rate</label>
                    <input name="HOURLY_RATE" value={editExpert.HOURLY_RATE} onChange={handleEditChange} placeholder="Hourly Rate ($)" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="AVAILABILITY" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Availability</label>
                    <input name="AVAILABILITY" value={editExpert.AVAILABILITY} onChange={handleEditChange} placeholder="Availability (e.g. Mon-Fri)" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="RESPONSE_TIME" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Response Time</label>
                    <input name="RESPONSE_TIME" value={editExpert.RESPONSE_TIME} onChange={handleEditChange} placeholder="Response Time (e.g. 1h)" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label htmlFor="LOCATION" style={{ fontWeight: 600, fontSize: '1.15rem' }}>Location</label>
                    <input name="LOCATION" value={editExpert.LOCATION} onChange={handleEditChange} placeholder="Location (e.g. City, Country)" style={{ padding: '18px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '1.15rem' }} />
                  </div>
                </div>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="edit_AGE">Age</Label>
                    <Input id="edit_AGE" name="AGE" placeholder="Age" value={editExpert.AGE || ''} onChange={handleEditChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="edit_ON_SITE_VISIT_FEES">On Site Visit Fees</Label>
                    <Input id="edit_ON_SITE_VISIT_FEES" name="ON_SITE_VISIT_FEES" placeholder="On Site Visit Fees" value={editExpert.ON_SITE_VISIT_FEES || ''} onChange={handleEditChange} />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup style={{ width: '100%' }}>
                    <Label htmlFor="edit_DESCRIPTION">Description</Label>
                    <TextArea id="edit_DESCRIPTION" name="DESCRIPTION" placeholder="Description" value={editExpert.DESCRIPTION || ''} onChange={handleEditChange} style={{ minHeight: '80px', width: '100%', resize: 'vertical' }} />
                  </FormGroup>
                </FormRow>
                <SectionTitle><FaBriefcase className="icon" /> Work Experience</SectionTitle>
                {editWorkExperiences.map((exp, idx) => (
                  <FormRow key={exp.EXPERIENCE_ID || idx}>
                    <FormGroup>
                      <Label htmlFor={`edit_COMPANY_NAME_${idx}`}>Company Name</Label>
                      <Input id={`edit_COMPANY_NAME_${idx}`} name="COMPANY_NAME" placeholder="Company Name" value={exp.COMPANY_NAME} onChange={e => handleEditWorkExperienceChange(idx, e)} />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor={`edit_JOB_TITLE_${idx}`}>Job Title</Label>
                      <Input id={`edit_JOB_TITLE_${idx}`} name="JOB_TITLE" placeholder="Job Title" value={exp.JOB_TITLE} onChange={e => handleEditWorkExperienceChange(idx, e)} />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor={`edit_START_DATE_${idx}`}>Start Date</Label>
                      <Input id={`edit_START_DATE_${idx}`} name="START_DATE" type="date" value={exp.START_DATE ? exp.START_DATE.slice(0,10) : ''} onChange={e => handleEditWorkExperienceChange(idx, e)} />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor={`edit_END_DATE_${idx}`}>End Date</Label>
                      <Input id={`edit_END_DATE_${idx}`} name="END_DATE" type="date" value={exp.END_DATE ? exp.END_DATE.slice(0,10) : ''} onChange={e => handleEditWorkExperienceChange(idx, e)} />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor={`edit_DESCRIPTION_${idx}`}>Description</Label>
                      <TextArea id={`edit_DESCRIPTION_${idx}`} name="DESCRIPTION" placeholder="Description" value={exp.DESCRIPTION} onChange={e => handleEditWorkExperienceChange(idx, e)} style={{ minHeight: '80px', width: '100%', resize: 'vertical' }} />
                    </FormGroup>
                    <button type="button" style={{ marginTop: 30, background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', height: 40 }} onClick={() => handleDeleteWorkExperienceRow(idx)}>Delete</button>
                  </FormRow>
                ))}
                <button type="button" style={{ margin: '16px 0', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }} onClick={handleAddWorkExperienceRow}>Add Work Experience</button>
                <SectionTitle><FaBriefcase className="icon" /> Appointment Time Slot</SectionTitle>
                {editTimeSlots.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8fafc', borderRadius: 8 }}>
                      <thead>
                        <tr>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }} colSpan={2}>Date & Time</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Label</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Booked?</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editTimeSlots.map((slot, idx) => (
                          <tr key={slot.SLOT_ID || idx}>
                            <td style={{ padding: 8 }} colSpan={2}>
                              <DatePicker
                                selected={getSlotDate(slot)}
                                onChange={date => {
                                  const updated = [...editTimeSlots];
                                  if (date) {
                                    updated[idx].AVAILABLE_DATE = formatSlotDate(date);
                                    updated[idx].AVAILABLE_TIME = formatSlotTime(date);
                                  } else {
                                    updated[idx].AVAILABLE_DATE = null;
                                    updated[idx].AVAILABLE_TIME = null;
                                  }
                                  setEditTimeSlots(updated);
                                }}
                                showTimeSelect
                                timeFormat="hh:mm aa"
                                dateFormat="MM/dd/yyyy hh:mm aa"
                                placeholderText="Select date and time"
                                minDate={new Date()}
                                style={{ width: '100%' }}
                              />
                            </td>
                            <td style={{ padding: 8 }}>
                              <Input
                                value={slot.SLOT_LABEL || ''}
                                onChange={e => {
                                  const updated = [...editTimeSlots];
                                  updated[idx].SLOT_LABEL = e.target.value;
                                  setEditTimeSlots(updated);
                                }}
                                placeholder="Label"
                              />
                            </td>
                            <td style={{ padding: 8 }}>{slot.IS_BOOKED ? 'Yes' : 'No'}</td>
                            <td style={{ padding: 8 }}>
                              <button type="button" style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}
                                onClick={async () => {
                                  console.log('Deleting time slot:', slot); // Debug log
                                  console.log('Current editTimeSlots before deletion:', editTimeSlots); // Debug log
                                  
                                  if (slot.SLOT_ID) {
                                    await deleteTimeSlot(slot.SLOT_ID);
                                    setDeletedSlotIds(prev => [...prev, slot.SLOT_ID]);
                                  }
                                  
                                  // Create a new array without the deleted slot to avoid mutation issues
                                  const updatedSlots = editTimeSlots.filter((_, i) => i !== idx);
                                  console.log('Updated slots after deletion:', updatedSlots); // Debug log
                                  setEditTimeSlots(updatedSlots);
                                }}
                              >Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="newEditSlotDate">Add New Slot (Date & Time)</Label>
                    <DatePicker
                      id="newEditSlotDate"
                      selected={newEditSlotDate}
                      onChange={date => setNewEditSlotDate(date)}
                      showTimeSelect
                      timeFormat="hh:mm aa"
                      dateFormat="MM/dd/yyyy hh:mm aa"
                      placeholderText="Select date and time"
                      minDate={new Date()}
                      style={{ width: '100%' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="newEditSlotLabel">Slot Label (optional)</Label>
                    <Input id="newEditSlotLabel" name="newEditSlotLabel" placeholder="e.g. Morning Slot" value={newEditSlotLabel} onChange={e => setNewEditSlotLabel(e.target.value)} />
                  </FormGroup>
                  <FormGroup style={{ alignSelf: 'end' }}>
                    <button type="button" style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}
                      onClick={() => {
                        if (newEditSlotDate) {
                          setEditTimeSlots([...editTimeSlots, {
                            AVAILABLE_DATE: formatSlotDate(newEditSlotDate),
                            AVAILABLE_TIME: formatSlotTime(newEditSlotDate),
                            SLOT_LABEL: newEditSlotLabel,
                            IS_BOOKED: 0
                          }]);
                          setNewEditSlotDate(null);
                          setNewEditSlotLabel('');
                        }
                      }}
                      disabled={!newEditSlotDate}
                    >Add Slot</button>
                  </FormGroup>
                </FormRow>
                <div style={{ display: 'flex', gap: 16, marginTop: 32, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setEditExpert(null)} style={{
                    background: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 24,
                    padding: '12px 32px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginRight: 8
                  }}>Cancel</button>
                  <button type="submit" style={{
                    background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 24,
                    padding: '12px 32px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}>Save</button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'left', padding: 24 }}>
                <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', marginBottom: 32 }}>
                  <div>
                  {selectedExpert.IMAGE ? (
                    <img
                      src={selectedExpert.IMAGE}
                      alt={`${selectedExpert.NAME}'s profile`}
                        style={{ width: 120, height: 120, borderRadius: 16, objectFit: 'cover', border: '2px solid #879aae', marginBottom: 8 }}
                      onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
                    />
                  ) : (
                      <DefaultProfileImage style={{ width: 120, height: 120, fontSize: '2.5rem', marginBottom: 8 }}>
                      {selectedExpert.NAME ? selectedExpert.NAME.charAt(0).toUpperCase() : 'E'}
                    </DefaultProfileImage>
                  )}
                </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{selectedExpert.NAME}</h2>
                    <div style={{ color: '#666', fontWeight: 500, marginBottom: 4 }}><b>Age:</b> {selectedExpert.AGE || 'N/A'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '8px 0' }}>
                      <span style={{ color: '#666', fontWeight: 500 }}><FaGraduationCap style={{ marginRight: 6, color: '#22c55e' }} />{selectedExpert.TITLE}</span>
                      <span style={{ color: '#ffd700', fontWeight: 600 }}><FaStar style={{ marginRight: 4 }} />{selectedExpert.RATING}</span>
                      <span style={{ color: '#666', fontWeight: 500 }}><b>Reviews:</b> {selectedExpert.REVIEWS}</span>
                    </div>
                    <div style={{ color: '#444', fontSize: '1rem', marginBottom: 8 }}>{selectedExpert.DESCRIPTION}</div>
                    <div style={{ color: '#555', marginBottom: 8 }}>{selectedExpert.CATEGORY}</div>
                    <div style={{ color: '#444', fontSize: '1rem', marginBottom: 8 }}>{selectedExpert.EXPERTISE}</div>
                  </div>
                  <div style={{ minWidth: 260, background: '#f8fafc', borderRadius: 12, padding: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontWeight: 700, marginBottom: 10, color: '#14532d' }}>Contact Information</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <FaEnvelope style={{ color: '#22c55e' }} />
                      <span>{selectedExpert.EMAIL || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <FaPhone style={{ color: '#22c55e' }} />
                      <span>{selectedExpert.PHONE || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FaMapMarkerAlt style={{ color: '#22c55e' }} />
                      <span>{selectedExpert.LOCATION || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, color: '#14532d', marginBottom: 8 }}>Professional Experience</div>
                  <div style={{ color: '#444', marginBottom: 4 }}><b>Experience:</b> {selectedExpert.EXPERIENCE}</div>
                  <div style={{ color: '#444', marginBottom: 4 }}><b>Specialties:</b> {selectedExpert.SPECIALTIES}</div>
                  <div style={{ color: '#444', marginBottom: 4 }}><b>Reviews:</b> {selectedExpert.REVIEWS}</div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, color: '#14532d', marginBottom: 8 }}>Consultation Fees</div>
                  <div style={{ color: '#444', marginBottom: 4 }}><b>Hourly Rate:</b> {selectedExpert.HOURLY_RATE}</div>
                  <div style={{ color: '#444', marginBottom: 4 }}><b>On Site Visit Fees:</b> {selectedExpert.ON_SITE_VISIT_FEES || 'N/A'}</div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, color: '#14532d', marginBottom: 8 }}>Availability</div>
                  <div style={{ color: '#444', marginBottom: 4 }}><b>Availability:</b> {selectedExpert.AVAILABILITY}</div>
                  <div style={{ color: '#444', marginBottom: 4 }}><b>Response Time:</b> {selectedExpert.RESPONSE_TIME}</div>
                </div>
                {viewWorkExperiences.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontWeight: 700, color: '#14532d', marginBottom: 8 }}>Work Experience</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8fafc', borderRadius: 8 }}>
                      <thead>
                        <tr>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Company</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Job Title</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Start Date</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>End Date</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewWorkExperiences.map(exp => (
                          <tr key={exp.EXPERIENCE_ID}>
                            <td style={{ padding: 8 }}>{exp.COMPANY_NAME}</td>
                            <td style={{ padding: 8 }}>{exp.JOB_TITLE}</td>
                            <td style={{ padding: 8 }}>{exp.START_DATE ? exp.START_DATE.slice(0,10) : ''}</td>
                            <td style={{ padding: 8 }}>{exp.END_DATE ? exp.END_DATE.slice(0,10) : ''}</td>
                            <td style={{ padding: 8 }}>{exp.DESCRIPTION}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {viewTimeSlots.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontWeight: 700, color: '#14532d', marginBottom: 8 }}>Available Time Slots</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8fafc', borderRadius: 8 }}>
                      <thead>
                        <tr>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Date</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Time</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Label</th>
                          <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Booked?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewTimeSlots.map(slot => {
                          let dateObj = null;
                          if (slot.AVAILABLE_DATE) {
                            // Try to parse ISO or YYYY-MM-DD
                            dateObj = slot.AVAILABLE_DATE.includes('T') ? new Date(slot.AVAILABLE_DATE) : new Date(slot.AVAILABLE_DATE + 'T' + (slot.AVAILABLE_TIME || '00:00'));
                          }
                          return (
                            <tr key={slot.SLOT_ID}>
                              <td style={{ padding: 8 }}>{dateObj ? formatDateFns(dateObj, 'MM/dd/yyyy') : ''}</td>
                              <td style={{ padding: 8 }}>{dateObj ? formatDateFns(dateObj, 'hh:mm aa') : ''}</td>
                              <td style={{ padding: 8 }}>{slot.SLOT_LABEL}</td>
                              <td style={{ padding: 8 }}>{slot.IS_BOOKED ? 'Yes' : 'No'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                <ButtonGroup>
                  <CancelButton type="button" onClick={() => setSelectedExpert(null)}><FaTimes /> Close</CancelButton>
                  <EditButton type="button" onClick={() => setEditExpert(selectedExpert)}><FaEdit /> Edit Profile</EditButton>
                  <DeleteButton type="button" onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this expert?')) {
                      await deleteExpert(selectedExpert.ID);
                      setSelectedExpert(null);
                      setLoading(true);
                      const updated = await fetchExperts();
                      setExperts(updated);
                      setLoading(false);
                    }
                  }}><FaTimes /> Delete Profile</DeleteButton>
                </ButtonGroup>
              </div>
            )}
          </Modal>
        </ModalOverlay>
      )}
      {showAddModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Add New Expert</ModalTitle>
            <Form onSubmit={handleAddExpert}>
              <SectionTitle><FaUser className="icon" /> Personal Info</SectionTitle>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="IMAGE">Profile Image URL</Label>
                  <Input 
                    id="IMAGE" 
                    name="IMAGE" 
                    placeholder="https://example.com/image.jpg" 
                    value={newExpert.IMAGE} 
                    onChange={e => setNewExpert({ ...newExpert, IMAGE: e.target.value })} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="NAME">Name</Label>
                  <Input id="NAME" name="NAME" placeholder="Full Name" value={newExpert.NAME} onChange={e => setNewExpert({ ...newExpert, NAME: e.target.value })} required />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="PHONE">Phone</Label>
                  <Input id="PHONE" name="PHONE" placeholder="Phone Number" value={newExpert.PHONE || ''} onChange={e => setNewExpert({ ...newExpert, PHONE: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="EMAIL">Email</Label>
                  <Input id="EMAIL" name="EMAIL" placeholder="Email Address" value={newExpert.EMAIL || ''} onChange={e => setNewExpert({ ...newExpert, EMAIL: e.target.value })} />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="TITLE">Title</Label>
                  <Input id="TITLE" name="TITLE" placeholder="Title (e.g. Senior Developer)" value={newExpert.TITLE} onChange={e => setNewExpert({ ...newExpert, TITLE: e.target.value })} required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="CATEGORY">Category</Label>
                  <Input id="CATEGORY" name="CATEGORY" placeholder="Category (e.g. IT, Finance)" value={newExpert.CATEGORY} onChange={e => setNewExpert({ ...newExpert, CATEGORY: e.target.value })} />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="LOCATION">Location</Label>
                  <Input id="LOCATION" name="LOCATION" placeholder="Location (e.g. City, Country)" value={newExpert.LOCATION} onChange={e => setNewExpert({ ...newExpert, LOCATION: e.target.value })} />
                </FormGroup>
              </FormRow>

              <SectionTitle><FaBriefcase className="icon" /> Professional Info</SectionTitle>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="EXPERTISE">Expertise</Label>
                  <Input id="EXPERTISE" name="EXPERTISE" placeholder="Expertise (e.g. React, Node.js)" value={newExpert.EXPERTISE} onChange={e => setNewExpert({ ...newExpert, EXPERTISE: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="SPECIALTIES">Specialties</Label>
                  <Input id="SPECIALTIES" name="SPECIALTIES" placeholder="Specialties" value={newExpert.SPECIALTIES} onChange={e => setNewExpert({ ...newExpert, SPECIALTIES: e.target.value })} />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="EXPERIENCE">Experience</Label>
                  <Input id="EXPERIENCE" name="EXPERIENCE" placeholder="Years of Experience" value={newExpert.EXPERIENCE} onChange={e => setNewExpert({ ...newExpert, EXPERIENCE: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="REVIEWS">Reviews</Label>
                  <Input id="REVIEWS" name="REVIEWS" placeholder="Number of Reviews" value={newExpert.REVIEWS} onChange={e => setNewExpert({ ...newExpert, REVIEWS: e.target.value })} />
                </FormGroup>
              </FormRow>

              <SectionTitle><FaStar className="icon" /> Ratings & Availability</SectionTitle>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="RATING">Rating</Label>
                  <Input id="RATING" name="RATING" placeholder="Rating (e.g. 4.8)" value={newExpert.RATING} onChange={e => setNewExpert({ ...newExpert, RATING: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="HOURLY_RATE">Hourly Rate</Label>
                  <Input id="HOURLY_RATE" name="HOURLY_RATE" placeholder="Hourly Rate ($)" value={newExpert.HOURLY_RATE} onChange={e => setNewExpert({ ...newExpert, HOURLY_RATE: e.target.value })} />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="AVAILABILITY">Availability</Label>
                  <Input id="AVAILABILITY" name="AVAILABILITY" placeholder="Availability (e.g. Mon-Fri)" value={newExpert.AVAILABILITY} onChange={e => setNewExpert({ ...newExpert, AVAILABILITY: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="RESPONSE_TIME">Response Time</Label>
                  <Input id="RESPONSE_TIME" name="RESPONSE_TIME" placeholder="Response Time (e.g. 1h)" value={newExpert.RESPONSE_TIME} onChange={e => setNewExpert({ ...newExpert, RESPONSE_TIME: e.target.value })} />
                </FormGroup>
              </FormRow>

              <SectionTitle><FaBriefcase className="icon" /> Work Experience</SectionTitle>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="COMPANY_NAME">Company</Label>
                  <Input id="COMPANY_NAME" name="COMPANY_NAME" placeholder="Company Name" value={workExperience.COMPANY_NAME} onChange={e => setWorkExperience({ ...workExperience, COMPANY_NAME: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="JOB_TITLE">Job Title</Label>
                  <Input id="JOB_TITLE" name="JOB_TITLE" placeholder="Job Title" value={workExperience.JOB_TITLE} onChange={e => setWorkExperience({ ...workExperience, JOB_TITLE: e.target.value })} required />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="START_DATE">Start Date</Label>
                  <Input id="START_DATE" name="START_DATE" type="date" value={workExperience.START_DATE} onChange={e => setWorkExperience({ ...workExperience, START_DATE: e.target.value })} required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="END_DATE">End Date</Label>
                  <Input id="END_DATE" name="END_DATE" type="date" value={workExperience.END_DATE} onChange={e => setWorkExperience({ ...workExperience, END_DATE: e.target.value })} />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="DESCRIPTION">Description</Label>
                  <Input id="DESCRIPTION" name="DESCRIPTION" placeholder="Description" value={workExperience.DESCRIPTION} onChange={e => setWorkExperience({ ...workExperience, DESCRIPTION: e.target.value })} />
                </FormGroup>
              </FormRow>

              <SectionTitle><FaBriefcase className="icon" /> Additional Info</SectionTitle>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="AGE">Age</Label>
                  <Input id="AGE" name="AGE" placeholder="Age" value={newExpert.AGE} onChange={e => setNewExpert({ ...newExpert, AGE: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="ON_SITE_VISIT_FEES">On Site Visit Fees</Label>
                  <Input id="ON_SITE_VISIT_FEES" name="ON_SITE_VISIT_FEES" placeholder="On Site Visit Fees" value={newExpert.ON_SITE_VISIT_FEES} onChange={e => setNewExpert({ ...newExpert, ON_SITE_VISIT_FEES: e.target.value })} />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup style={{ width: '100%' }}>
                  <Label htmlFor="DESCRIPTION">Description</Label>
                  <Input id="DESCRIPTION" name="DESCRIPTION" placeholder="Description" value={newExpert.DESCRIPTION} onChange={e => setNewExpert({ ...newExpert, DESCRIPTION: e.target.value })} />
                </FormGroup>
              </FormRow>

              <SectionTitle><FaBriefcase className="icon" /> Appointment Time Slot</SectionTitle>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="slotDate">Select Date & Time</Label>
                  <DatePicker
                    id="slotDate"
                    selected={slotDate}
                    onChange={date => setSlotDate(date)}
                    showTimeSelect
                    timeFormat="hh:mm aa"
                    dateFormat="MM/dd/yyyy hh:mm aa"
                    placeholderText="Select date and time"
                    minDate={new Date()}
                    style={{ width: '100%' }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="slotLabel">Slot Label (optional)</Label>
                  <Input id="slotLabel" name="slotLabel" placeholder="e.g. Morning Slot" value={slotLabel} onChange={e => setSlotLabel(e.target.value)} />
                </FormGroup>
                <FormGroup style={{ alignSelf: 'end' }}>
                  <button type="button" style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}
                    onClick={() => {
                      if (slotDate) {
                        const newSlot = {
                          AVAILABLE_DATE: formatSlotDate(slotDate),
                          AVAILABLE_TIME: formatSlotTime(slotDate),
                          SLOT_LABEL: slotLabel,
                          IS_BOOKED: 0
                        };
                        console.log('Adding new time slot:', newSlot); // Debug log
                        setTimeSlots([...timeSlots, newSlot]);
                        setSlotDate(null);
                        setSlotLabel('');
                      }
                    }}
                  >Add Slot</button>
                </FormGroup>
              </FormRow>
              {timeSlots.length > 0 && (
                <div style={{ margin: '12px 0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8fafc', borderRadius: 8 }}>
                    <thead>
                      <tr>
                        <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Date</th>
                        <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Time</th>
                        <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Label</th>
                        <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((slot, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: 8 }}>{slot.AVAILABLE_DATE}</td>
                          <td style={{ padding: 8 }}>{slot.AVAILABLE_TIME}</td>
                          <td style={{ padding: 8 }}>{slot.SLOT_LABEL}</td>
                          <td style={{ padding: 8 }}>
                            <button type="button" style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}
                              onClick={() => setTimeSlots(timeSlots.filter((_, i) => i !== idx))}
                            >Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <ButtonGroup>
                <CancelButton type="button" onClick={() => setShowAddModal(false)}><FaTimes /> Cancel</CancelButton>
                <SaveButton type="submit"><FaSave /> Add</SaveButton>
              </ButtonGroup>
            </Form>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default ExpertProfile; 