const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // MySQL connection

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Add static file serving for images - update this path to match your image directory
const IMAGES_DIR = 'C:\\Users\\HP\\Pictures\\Mysql_images';
app.use('/images', express.static(IMAGES_DIR));

// Convert file path to URL in the response
function convertImagePathToUrl(expert) {
  if (!expert.IMAGE) return expert;

  try {
    // If it's already a URL, return as is
    if (expert.IMAGE.startsWith('http://') || expert.IMAGE.startsWith('https://')) {
      return expert;
    }

    // If it's a full path, get just the filename
    const fileName = path.basename(expert.IMAGE);
    
    // Check if the file exists in the images directory
    const fullPath = path.join(IMAGES_DIR, fileName);
    if (require('fs').existsSync(fullPath)) {
      expert.IMAGE = `http://localhost:${PORT}/images/${fileName}`;
    } else {
      console.log(`Image file not found: ${fullPath}`);
      expert.IMAGE = null;
    }
  } catch (error) {
    console.error('Error processing image path:', error);
    expert.IMAGE = null;
  }
  
  return expert;
}

// Log middleware to see what's coming from database
app.use((req, res, next) => {
  if (req.path === '/experts' && req.method === 'GET') {
    console.log('Experts endpoint hit');
  }
  next();
});

// ✅ Insert expert data into MySQL
app.post('/experts', (req, res) => {
  const {
    NAME,
    TITLE,
    RATING,
    CATEGORY,
    EXPERTISE,
    REVIEWS,
    EXPERIENCE,
    SPECIALTIES,
    AVAILABILITY,
    RESPONSE_TIME,
    HOURLY_RATE,
    LOCATION,
    IMAGE,
    PHONE,
    EMAIL,
    AGE,
    DESCRIPTION,
    ON_SITE_VISIT_FEES
  } = req.body;

  const query = `
  INSERT INTO profile_details (
    NAME, TITLE, RATING, CATEGORY, EXPERTISE, REVIEWS,
    EXPERIENCE, SPECIALTIES, AVAILABILITY, RESPONSE_TIME,
    HOURLY_RATE, LOCATION, IMAGE, PHONE, EMAIL,
    AGE, DESCRIPTION, ON_SITE_VISIT_FEES
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  const values = [
    NAME, TITLE, RATING, CATEGORY, EXPERTISE, REVIEWS,
    EXPERIENCE, SPECIALTIES, AVAILABILITY, RESPONSE_TIME,
    HOURLY_RATE, LOCATION, IMAGE, PHONE, EMAIL,
    AGE, DESCRIPTION, ON_SITE_VISIT_FEES
  ];

  console.log('Inserting values:', values);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Failed to insert expert data' });
    }
    res.status(200).json({ message: 'Expert added successfully', id: result.insertId });
  });
});

// ✅ Get all experts from MySQL
app.get('/experts', (req, res) => {
  const query = 'SELECT * FROM profile_details ORDER BY ID DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ message: 'Failed to fetch expert data' });
    }
    // Convert file paths to URLs for each expert
    const expertsWithUrls = results.map(expert => convertImagePathToUrl(expert));
    res.status(200).json(expertsWithUrls);
  });
});

// ✅ Update expert data in MySQL
app.put('/experts/:id', (req, res) => {
  const id = req.params.id;
  const {
    NAME,
    TITLE,
    RATING,
    CATEGORY,
    EXPERTISE,
    REVIEWS,
    EXPERIENCE,
    SPECIALTIES,
    AVAILABILITY,
    RESPONSE_TIME,
    HOURLY_RATE,
    LOCATION,
    IMAGE,
    PHONE,
    EMAIL,
    AGE,
    DESCRIPTION,
    ON_SITE_VISIT_FEES
  } = req.body;

  const query = `
    UPDATE profile_details SET
      NAME = ?,
      TITLE = ?,
      RATING = ?,
      CATEGORY = ?,
      EXPERTISE = ?,
      REVIEWS = ?,
      EXPERIENCE = ?,
      SPECIALTIES = ?,
      AVAILABILITY = ?,
      RESPONSE_TIME = ?,
      HOURLY_RATE = ?,
      LOCATION = ?,
      IMAGE = ?,
      PHONE = ?,
      EMAIL = ?,
      AGE = ?,
      DESCRIPTION = ?,
      ON_SITE_VISIT_FEES = ?
    WHERE ID = ?
  `;

  const values = [
    NAME, TITLE, RATING, CATEGORY, EXPERTISE, REVIEWS,
    EXPERIENCE, SPECIALTIES, AVAILABILITY, RESPONSE_TIME,
    HOURLY_RATE, LOCATION, IMAGE, PHONE, EMAIL,
    AGE, DESCRIPTION, ON_SITE_VISIT_FEES, id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Failed to update expert data' });
    }
    res.status(200).json({ message: 'Expert updated successfully' });
  });
});

// Update the DELETE /experts/:id endpoint to cascade delete work experience
app.delete('/experts/:id', (req, res) => {
  const id = req.params.id;
  // First, delete all work experiences for this expert
  db.query('DELETE FROM work_experience WHERE EXPERT_ID = ?', [id], (err) => {
    if (err) {
      console.error('Delete work experience error:', err);
      return res.status(500).json({ message: 'Failed to delete work experience' });
    }
    // Then, delete the expert
    db.query('DELETE FROM profile_details WHERE ID = ?', [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ message: 'Failed to delete expert' });
    }
    res.status(200).json({ message: 'Expert deleted successfully' });
    });
  });
});

// Fix the /bookings endpoint to use correct table and column names
app.get('/bookings', (req, res) => {
  const query = 'SELECT ID, FULL_NAME, EMAIL, PHONE, MESSAGE, BOOKED_SLOT FROM booking_details ORDER BY ID DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Fetch bookings error:', err);
      return res.status(500).json({ message: 'Failed to fetch bookings' });
    }
    res.status(200).json(results);
  });
});

// POST: Add a new booking
app.post('/bookings', (req, res) => {
  const { FULL_NAME, EMAIL, PHONE, MESSAGE } = req.body;
  const query = 'INSERT INTO booking_details (FULL_NAME, EMAIL, PHONE, MESSAGE) VALUES (?, ?, ?, ?)';
  db.query(query, [FULL_NAME, EMAIL, PHONE, MESSAGE], (err, result) => {
    if (err) {
      console.error('Insert booking error:', err);
      return res.status(500).json({ message: 'Failed to add booking' });
    }
    res.status(200).json({ message: 'Booking added successfully', id: result.insertId });
  });
});

// PUT: Update a booking
app.put('/bookings/:id', (req, res) => {
  const id = req.params.id;
  const { FULL_NAME, EMAIL, PHONE, MESSAGE, BOOKED_SLOT } = req.body;
  const query = 'UPDATE booking_details SET FULL_NAME = ?, EMAIL = ?, PHONE = ?, MESSAGE = ?, BOOKED_SLOT = ? WHERE ID = ?';
  db.query(query, [FULL_NAME, EMAIL, PHONE, MESSAGE, BOOKED_SLOT, id], (err, result) => {
    if (err) {
      console.error('Update booking error:', err);
      return res.status(500).json({ message: 'Failed to update booking' });
    }
    res.status(200).json({ message: 'Booking updated successfully' });
  });
});

// DELETE: Delete a booking
app.delete('/bookings/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM booking_details WHERE ID = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Delete booking error:', err);
      return res.status(500).json({ message: 'Failed to delete booking' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  });
});

// Add after the /experts endpoints
app.post('/work_experience', (req, res) => {
  const { EXPERT_ID, JOB_TITLE, COMPANY_NAME, START_DATE, END_DATE, DESCRIPTION } = req.body;
  const query = `
    INSERT INTO work_experience (EXPERT_ID, JOB_TITLE, COMPANY_NAME, START_DATE, END_DATE, DESCRIPTION)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [EXPERT_ID, JOB_TITLE, COMPANY_NAME, START_DATE, END_DATE, DESCRIPTION], (err, result) => {
    if (err) {
      console.error('Insert work experience error:', err);
      return res.status(500).json({ message: 'Failed to insert work experience' });
    }
    res.status(200).json({ message: 'Work experience added successfully', id: result.insertId });
  });
});

// Fix GET /work_experience/:expertId to filter by EXPERT_ID
app.get('/work_experience/:expertId', (req, res) => {
  const expertId = req.params.expertId;
  const query = 'SELECT * FROM work_experience WHERE EXPERT_ID = ?';
  db.query(query, [expertId], (err, results) => {
    if (err) {
      console.error('Fetch work experience error:', err);
      return res.status(500).json({ message: 'Failed to fetch work experience' });
    }
    res.status(200).json(results);
  });
});

// Update a work experience entry
app.put('/work_experience/:experienceId', (req, res) => {
  const experienceId = req.params.experienceId;
  const { JOB_TITLE, COMPANY_NAME, START_DATE, END_DATE, DESCRIPTION } = req.body;
  const query = `UPDATE work_experience SET JOB_TITLE = ?, COMPANY_NAME = ?, START_DATE = ?, END_DATE = ?, DESCRIPTION = ? WHERE EXPERIENCE_ID = ?`;
  db.query(query, [JOB_TITLE, COMPANY_NAME, START_DATE, END_DATE, DESCRIPTION, experienceId], (err, result) => {
    if (err) {
      console.error('Update work experience error:', err);
      return res.status(500).json({ message: 'Failed to update work experience' });
    }
    res.status(200).json({ message: 'Work experience updated successfully' });
  });
});

// Delete a work experience entry
app.delete('/work_experience/:experienceId', (req, res) => {
  const experienceId = req.params.experienceId;
  const query = 'DELETE FROM work_experience WHERE EXPERIENCE_ID = ?';
  db.query(query, [experienceId], (err, result) => {
    if (err) {
      console.error('Delete work experience error:', err);
      return res.status(500).json({ message: 'Failed to delete work experience' });
    }
    res.status(200).json({ message: 'Work experience deleted successfully' });
  });
});

// Add POST /time_slots endpoint to save multiple slots for an expert
app.post('/time_slots', (req, res) => {
  const { expertId, slots } = req.body;
  console.log('Received time slots request:', { expertId, slots }); // Debug log
  
  if (!expertId || !Array.isArray(slots)) {
    console.log('Invalid request - missing expertId or slots not array'); // Debug log
    return res.status(400).json({ message: 'Invalid request' });
  }
  if (slots.length === 0) {
    console.log('No slots to add'); // Debug log
    return res.status(200).json({ message: 'No slots to add' });
  }
  
  // First, let's check if the table exists and its structure
  db.query('DESCRIBE time_slot_details', (err, tableInfo) => {
    if (err) {
      console.error('Error checking table structure:', err);
      return res.status(500).json({ message: 'Database table error' });
    }
    console.log('Table structure:', tableInfo); // Debug log
    
    const values = slots.map(slot => {
      console.log('Processing slot:', slot); // Debug log
      return [
        expertId,
        slot.AVAILABLE_DATE,
        slot.AVAILABLE_TIME,
        slot.SLOT_LABEL || '',
        slot.IS_BOOKED || 0
      ];
    });
    
    console.log('Final values to insert:', values); // Debug log
    
    const query = 'INSERT INTO time_slot_details (EXPERT_ID, AVAILABLE_DATE, AVAILABLE_TIME, SLOT_LABEL, IS_BOOKED) VALUES ?';
    db.query(query, [values], (err, result) => {
      if (err) {
        console.error('Insert time slots error:', err);
        return res.status(500).json({ message: 'Failed to insert time slots' });
      }
      console.log('Time slots inserted successfully:', result); // Debug log
      res.status(200).json({ message: 'Time slots added successfully', count: result.affectedRows });
    });
  });
});

// Add GET /time_slots/:expertId endpoint to fetch all slots for an expert
app.get('/time_slots/:expertId', (req, res) => {
  const expertId = req.params.expertId;
  const query = 'SELECT * FROM time_slot_details WHERE EXPERT_ID = ? ORDER BY AVAILABLE_DATE, AVAILABLE_TIME';
  db.query(query, [expertId], (err, results) => {
    if (err) {
      console.error('Fetch time slots error:', err);
      return res.status(500).json({ message: 'Failed to fetch time slots' });
    }
    res.status(200).json(results);
  });
});

// Update a time slot
app.put('/time_slots/:slotId', (req, res) => {
  const slotId = req.params.slotId;
  let { AVAILABLE_DATE, AVAILABLE_TIME, SLOT_LABEL, IS_BOOKED } = req.body;
  // Convert empty string to null for MySQL compatibility
  if (!AVAILABLE_DATE) AVAILABLE_DATE = null;
  if (!AVAILABLE_TIME) AVAILABLE_TIME = null;
  const query = `UPDATE time_slot_details SET AVAILABLE_DATE = ?, AVAILABLE_TIME = ?, SLOT_LABEL = ?, IS_BOOKED = ? WHERE SLOT_ID = ?`;
  db.query(query, [AVAILABLE_DATE, AVAILABLE_TIME, SLOT_LABEL, IS_BOOKED, slotId], (err, result) => {
    if (err) {
      console.error('Update time slot error:', err);
      return res.status(500).json({ message: 'Failed to update time slot' });
    }
    res.status(200).json({ message: 'Time slot updated successfully' });
  });
});

// Delete a time slot
app.delete('/time_slots/:slotId', (req, res) => {
  const slotId = req.params.slotId;
  const query = 'DELETE FROM time_slot_details WHERE SLOT_ID = ?';
  db.query(query, [slotId], (err, result) => {
    if (err) {
      console.error('Delete time slot error:', err);
      return res.status(500).json({ message: 'Failed to delete time slot' });
    }
    res.status(200).json({ message: 'Time slot deleted successfully' });
  });
});

// Test endpoint to check table structure and data
app.get('/test/time_slots', (req, res) => {
  // Check if table exists
  db.query('SHOW TABLES LIKE "time_slot_details"', (err, tables) => {
    if (err) {
      console.error('Error checking table existence:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (tables.length === 0) {
      return res.status(404).json({ message: 'Table time_slot_details does not exist' });
    }
    
    // Get table structure
    db.query('DESCRIBE time_slot_details', (err, structure) => {
      if (err) {
        console.error('Error getting table structure:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      
      // Get sample data
      db.query('SELECT * FROM time_slot_details LIMIT 5', (err, data) => {
        if (err) {
          console.error('Error getting sample data:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        
        res.status(200).json({
          tableExists: true,
          structure: structure,
          sampleData: data
        });
      });
    });
  });
});

// Review endpoints
// ✅ Get all reviews from MySQL
app.get('/reviews', (req, res) => {
  const query = 'SELECT * FROM review_details ORDER BY USER_ID DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Fetch reviews error:', err);
      return res.status(500).json({ message: 'Failed to fetch review data' });
    }
    res.status(200).json(results);
  });
});

// ✅ Insert review data into MySQL
app.post('/reviews', (req, res) => {
  const {
    FULL_NAME,
    PHONE,
    EMAIL,
    MESSAGE,
    EXPERT_ID
  } = req.body;

  const query = `
    INSERT INTO review_details (
      FULL_NAME, PHONE, EMAIL, MESSAGE, EXPERT_ID
    ) VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    FULL_NAME,
    PHONE,
    EMAIL,
    MESSAGE,
    EXPERT_ID
  ];

  console.log('Inserting review values:', values);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Insert review error:', err);
      return res.status(500).json({ message: 'Failed to insert review data' });
    }
    res.status(200).json({ message: 'Review added successfully', id: result.insertId });
  });
});

// ✅ Update review data in MySQL
app.put('/reviews/:userId', (req, res) => {
  const userId = req.params.userId;
  const {
    FULL_NAME,
    PHONE,
    EMAIL,
    MESSAGE,
    EXPERT_ID
  } = req.body;

  const query = `
    UPDATE review_details SET
      FULL_NAME = ?,
      PHONE = ?,
      EMAIL = ?,
      MESSAGE = ?,
      EXPERT_ID = ?
    WHERE USER_ID = ?
  `;

  const values = [
    FULL_NAME,
    PHONE,
    EMAIL,
    MESSAGE,
    EXPERT_ID,
    userId
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Update review error:', err);
      return res.status(500).json({ message: 'Failed to update review data' });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  });
});

// ✅ Delete review from MySQL
app.delete('/reviews/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'DELETE FROM review_details WHERE USER_ID = ?';
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Delete review error:', err);
      return res.status(500).json({ message: 'Failed to delete review' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
