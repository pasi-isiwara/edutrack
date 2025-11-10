import express from 'express';
import db from '../db.js';

const router = express.Router();

// ============ CAREER PATHS ============

// Get all career paths with recommended courses
router.get('/careers', async (req, res) => {
  try {
    const [careers] = await db.query('SELECT * FROM career_paths ORDER BY name');
    
    // Get recommended courses for each career path
    const careersWithCourses = await Promise.all(
      careers.map(async (career) => {
        const [courses] = await db.query(
          `SELECT c.id, c.code, c.name 
           FROM career_recommended_courses crc 
           JOIN courses c ON crc.course_id = c.id 
           WHERE crc.career_path_id = ?
           ORDER BY c.name`,
          [career.id]
        );
        return {
          ...career,
          recommendedCourses: courses.map(c => c.id)
        };
      })
    );
    
    res.json(careersWithCourses);
  } catch (error) {
    console.error('Error fetching career paths:', error);
    res.status(500).json({ error: 'Failed to fetch career paths' });
  }
});

// Add new career path
router.post('/careers', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { id, name, recommendedCourses = [] } = req.body;
    
    if (!id || !name) {
      return res.status(400).json({ error: 'Career ID and name are required' });
    }

    await connection.beginTransaction();

    // Insert career path
    await connection.query(
      'INSERT INTO career_paths (id, name) VALUES (?, ?)',
      [id, name]
    );
    
    // Insert recommended courses
    if (recommendedCourses.length > 0) {
      const courseValues = recommendedCourses.map(courseId => [id, courseId]);
      await connection.query(
        'INSERT INTO career_recommended_courses (career_path_id, course_id) VALUES ?',
        [courseValues]
      );
    }

    await connection.commit();
    res.status(201).json({ message: 'Career path added successfully', career: { id, name, recommendedCourses } });
  } catch (error) {
    await connection.rollback();
    console.error('Error adding career path:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Career path with this ID already exists' });
    } else {
      res.status(500).json({ error: 'Failed to add career path' });
    }
  } finally {
    connection.release();
  }
});

// Update career path
router.put('/careers/:id', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { id: oldId } = req.params;
    const { id: newId, name, recommendedCourses = [] } = req.body;
    
    if (!newId || !name) {
      return res.status(400).json({ error: 'Career ID and name are required' });
    }

    await connection.beginTransaction();

    // Update career path
    await connection.query(
      'UPDATE career_paths SET id = ?, name = ? WHERE id = ?',
      [newId, name, oldId]
    );
    
    // Delete old recommended courses
    await connection.query(
      'DELETE FROM career_recommended_courses WHERE career_path_id = ?',
      [newId]
    );
    
    // Insert new recommended courses
    if (recommendedCourses.length > 0) {
      const courseValues = recommendedCourses.map(courseId => [newId, courseId]);
      await connection.query(
        'INSERT INTO career_recommended_courses (career_path_id, course_id) VALUES ?',
        [courseValues]
      );
    }

    await connection.commit();
    res.json({ message: 'Career path updated successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating career path:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Career path with this ID already exists' });
    } else {
      res.status(500).json({ error: 'Failed to update career path' });
    }
  } finally {
    connection.release();
  }
});

// Delete career path
router.delete('/careers/:id', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { id } = req.params;
    
    await connection.beginTransaction();
    
    // Delete recommended courses first (foreign key constraint)
    await connection.query('DELETE FROM career_recommended_courses WHERE career_path_id = ?', [id]);
    
    // Delete career path
    await connection.query('DELETE FROM career_paths WHERE id = ?', [id]);
    
    await connection.commit();
    res.json({ message: 'Career path deleted successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting career path:', error);
    res.status(500).json({ error: 'Failed to delete career path' });
  } finally {
    connection.release();
  }
});

// Get all courses (for dropdown selection)
router.get('/courses', async (req, res) => {
  try {
    const [courses] = await db.query('SELECT id, code, name FROM courses ORDER BY name');
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// ============ WORKSHOPS & EVENTS ============

// Get all workshops and events
router.get('/workshops', async (req, res) => {
  try {
    const [workshops] = await db.query(`
      SELECT id, title, type, date, time, location, instructor, 
             capacity, registered, companies, skills, created_at, updated_at 
      FROM career_workshops 
      ORDER BY date DESC
    `);
    
    // Parse skills JSON string to array
    const workshopsWithParsedSkills = workshops.map(workshop => {
      let parsedSkills = [];
      
      if (workshop.skills) {
        // Check if it's already an array (MySQL JSON type returns parsed object)
        if (Array.isArray(workshop.skills)) {
          parsedSkills = workshop.skills;
        } else if (typeof workshop.skills === 'string') {
          try {
            // Try to parse as JSON string
            parsedSkills = JSON.parse(workshop.skills);
          } catch (e) {
            // If it's not JSON, treat it as a comma-separated string
            parsedSkills = workshop.skills.split(',').map(s => s.trim()).filter(s => s);
          }
        }
      }
      
      return {
        ...workshop,
        skills: parsedSkills
      };
    });
    
    res.json(workshopsWithParsedSkills);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    res.status(500).json({ error: 'Failed to fetch workshops and events' });
  }
});

// Add new workshop/event
router.post('/workshops', async (req, res) => {
  try {
    const { 
      title, type, date, time, location, instructor, 
      capacity, registered, companies, skills 
    } = req.body;
    
    if (!title || !type || !date || !time || !location) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const skillsJson = JSON.stringify(skills || []);
    
    const [result] = await db.query(
      `INSERT INTO career_workshops 
       (title, type, date, time, location, instructor, capacity, registered, companies, skills) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, type, date, time, location, instructor || null, 
       capacity || null, registered || 0, companies || null, skillsJson]
    );
    
    res.status(201).json({ 
      message: 'Workshop/Event added successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error adding workshop:', error);
    res.status(500).json({ error: 'Failed to add workshop/event' });
  }
});

// Update workshop/event
router.put('/workshops/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, type, date, time, location, instructor, 
      capacity, registered, companies, skills 
    } = req.body;
    
    if (!title || !type || !date || !time || !location) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const skillsJson = JSON.stringify(skills || []);
    
    await db.query(
      `UPDATE career_workshops 
       SET title = ?, type = ?, date = ?, time = ?, location = ?, 
           instructor = ?, capacity = ?, registered = ?, companies = ?, skills = ?
       WHERE id = ?`,
      [title, type, date, time, location, instructor || null, 
       capacity || null, registered || 0, companies || null, skillsJson, id]
    );
    
    res.json({ message: 'Workshop/Event updated successfully' });
  } catch (error) {
    console.error('Error updating workshop:', error);
    res.status(500).json({ error: 'Failed to update workshop/event' });
  }
});

// Delete workshop/event
router.delete('/workshops/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM career_workshops WHERE id = ?', [id]);
    res.json({ message: 'Workshop/Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting workshop:', error);
    res.status(500).json({ error: 'Failed to delete workshop/event' });
  }
});

// ============ COMPETITIONS ============

// Get all competitions
router.get('/competitions', async (req, res) => {
  try {
    const [competitions] = await db.query(`
      SELECT id, title, date, registration_deadline, organizer, 
             description, prizes, skills, eligibility, created_at, updated_at 
      FROM career_competitions 
      ORDER BY date DESC
    `);
    
    // Parse skills JSON string to array
    const competitionsWithParsedSkills = competitions.map(competition => {
      let parsedSkills = [];
      
      if (competition.skills) {
        // Check if it's already an array (MySQL JSON type returns parsed object)
        if (Array.isArray(competition.skills)) {
          parsedSkills = competition.skills;
        } else if (typeof competition.skills === 'string') {
          try {
            // Try to parse as JSON string
            parsedSkills = JSON.parse(competition.skills);
          } catch (e) {
            // If it's not JSON, treat it as a comma-separated string
            parsedSkills = competition.skills.split(',').map(s => s.trim()).filter(s => s);
          }
        }
      }
      
      return {
        ...competition,
        registrationDeadline: competition.registration_deadline,
        skills: parsedSkills
      };
    });
    
    res.json(competitionsWithParsedSkills);
  } catch (error) {
    console.error('Error fetching competitions:', error);
    res.status(500).json({ error: 'Failed to fetch competitions' });
  }
});

// Add new competition
router.post('/competitions', async (req, res) => {
  try {
    const { 
      title, date, registrationDeadline, organizer, 
      description, prizes, skills, eligibility 
    } = req.body;
    
    if (!title || !date || !registrationDeadline) {
      return res.status(400).json({ error: 'Title, date, and registration deadline are required' });
    }

    const skillsJson = JSON.stringify(skills || []);
    
    const [result] = await db.query(
      `INSERT INTO career_competitions 
       (title, date, registration_deadline, organizer, description, prizes, skills, eligibility) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, date, registrationDeadline, organizer || null, 
       description || null, prizes || null, skillsJson, eligibility || null]
    );
    
    res.status(201).json({ 
      message: 'Competition added successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error adding competition:', error);
    res.status(500).json({ error: 'Failed to add competition' });
  }
});

// Update competition
router.put('/competitions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, date, registrationDeadline, organizer, 
      description, prizes, skills, eligibility 
    } = req.body;
    
    if (!title || !date || !registrationDeadline) {
      return res.status(400).json({ error: 'Title, date, and registration deadline are required' });
    }

    const skillsJson = JSON.stringify(skills || []);
    
    await db.query(
      `UPDATE career_competitions 
       SET title = ?, date = ?, registration_deadline = ?, organizer = ?, 
           description = ?, prizes = ?, skills = ?, eligibility = ?
       WHERE id = ?`,
      [title, date, registrationDeadline, organizer || null, 
       description || null, prizes || null, skillsJson, eligibility || null, id]
    );
    
    res.json({ message: 'Competition updated successfully' });
  } catch (error) {
    console.error('Error updating competition:', error);
    res.status(500).json({ error: 'Failed to update competition' });
  }
});

// Delete competition
router.delete('/competitions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM career_competitions WHERE id = ?', [id]);
    res.json({ message: 'Competition deleted successfully' });
  } catch (error) {
    console.error('Error deleting competition:', error);
    res.status(500).json({ error: 'Failed to delete competition' });
  }
});

export default router;
