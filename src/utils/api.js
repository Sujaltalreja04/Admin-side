const API_URL = 'http://localhost:5000';

export async function fetchExperts() {
  const res = await fetch(`${API_URL}/experts`);
  if (!res.ok) throw new Error('Failed to fetch experts');
  return res.json();
}

export async function addExpert(expert) {
  const res = await fetch(`${API_URL}/experts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expert)
  });
  if (!res.ok) throw new Error('Failed to add expert');
  return res.json();
}

export async function updateExpert(id, expert) {
  const res = await fetch(`${API_URL}/experts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expert)
  });
  if (!res.ok) throw new Error('Failed to update expert');
  return res.json();
}

export async function deleteExpert(id) {
  const res = await fetch(`${API_URL}/experts/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete expert');
  return res.json();
}

export async function fetchBookings() {
  const res = await fetch('http://localhost:5000/bookings');
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function updateBooking(id, booking) {
  const res = await fetch(`http://localhost:5000/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });
  if (!res.ok) throw new Error('Failed to update booking');
  return res.json();
}

export async function deleteBooking(id) {
  const res = await fetch(`http://localhost:5000/bookings/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete booking');
  return res.json();
}

export async function addWorkExperience(workExperience) {
  const res = await fetch(`${API_URL}/work_experience`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workExperience)
  });
  if (!res.ok) throw new Error('Failed to add work experience');
  return res.json();
}

export async function fetchWorkExperience(expertId) {
  const res = await fetch(`${API_URL}/work_experience/${expertId}`);
  if (!res.ok) throw new Error('Failed to fetch work experience');
  return res.json();
}

export async function updateWorkExperience(experienceId, workExperience) {
  const res = await fetch(`${API_URL}/work_experience/${experienceId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workExperience)
  });
  if (!res.ok) throw new Error('Failed to update work experience');
  return res.json();
}

export async function deleteWorkExperience(experienceId) {
  const res = await fetch(`${API_URL}/work_experience/${experienceId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete work experience');
  return res.json();
}

export async function addTimeSlots(expertId, slots) {
  const res = await fetch(`${API_URL}/time_slots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expertId, slots })
  });
  if (!res.ok) throw new Error('Failed to add time slots');
  return res.json();
}

export async function fetchTimeSlots(expertId) {
  const res = await fetch(`${API_URL}/time_slots/${expertId}`);
  if (!res.ok) throw new Error('Failed to fetch time slots');
  return res.json();
}

export async function updateTimeSlot(slotId, slot) {
  const res = await fetch(`${API_URL}/time_slots/${slotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slot)
  });
  if (!res.ok) throw new Error('Failed to update time slot');
  return res.json();
}

export async function deleteTimeSlot(slotId) {
  const res = await fetch(`${API_URL}/time_slots/${slotId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete time slot');
  return res.json();
}

// Review API functions
export async function fetchReviews() {
  const res = await fetch(`${API_URL}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function addReview(review) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  if (!res.ok) throw new Error('Failed to add review');
  return res.json();
}

export async function updateReview(userId, review) {
  const res = await fetch(`${API_URL}/reviews/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  if (!res.ok) throw new Error('Failed to update review');
  return res.json();
}

export async function deleteReview(userId) {
  const res = await fetch(`${API_URL}/reviews/${userId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete review');
  return res.json();
}

const handleEdit = async () => {
  setEditExpert(selectedExpert);
  if (selectedExpert && selectedExpert.ID) {
    try {
      const workExpArr = await fetchWorkExperience(selectedExpert.ID);
      setEditWorkExperiences(workExpArr || []);
    } catch {
      setEditWorkExperiences([]);
    }
  } else {
    setEditWorkExperiences([]);
  }
}; 