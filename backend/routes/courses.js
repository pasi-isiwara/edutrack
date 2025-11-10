import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all courses with their statistics
router.get('/', async (req, res) => {
  try {
    // Get all courses
    const [courses] = await db.query(
      `SELECT id, name, code, enrollment_key, eligibility_criteria, special_notes, teacher_id 
       FROM courses 
       ORDER BY created_at DESC`
    );

    // For each course, get topics and assessments count
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        // Get topics count
        const [topicsResult] = await db.query(
          `SELECT COUNT(*) as total FROM topics WHERE course_id = ?`,
          [course.id]
        );

        // Get assessments count
        const [assessmentsResult] = await db.query(
          `SELECT COUNT(*) as total FROM assessments WHERE course_id = ?`,
          [course.id]
        );

        return {
          id: course.id,
          code: course.code,
          name: course.name,
          enrollmentKey: course.enrollment_key,
          enrolledStudents: 0,
          topics: topicsResult[0].total,
          completedTopics: 0,
          assessments: assessmentsResult[0].total,
          completedAssessments: 0
        };
      })
    );

    res.json(coursesWithStats);

  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID with topics and assessments
router.get('/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

    // Get course details
    const [courses] = await db.query(
      `SELECT * FROM courses WHERE id = ?`,
      [courseId]
    );

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const course = courses[0];

    // Get topics for the course
    const [topics] = await db.query(
      `SELECT * FROM topics WHERE course_id = ? ORDER BY id`,
      [courseId]
    );

    // Get assessments for the course
    const [assessments] = await db.query(
      `SELECT * FROM assessments WHERE course_id = ? ORDER BY date`,
      [courseId]
    );

    // Combine all data
    const courseData = {
      id: course.id,
      name: course.name,
      code: course.code,
      enrollmentKey: course.enrollment_key,
      eligibilityCriteria: course.eligibility_criteria,
      specialNotes: course.special_notes,
      teacherId: course.teacher_id,
      topics: topics,
      assessments: assessments,
      enrolledStudents: []
    };

    res.json(courseData);

  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course details' });
  }
});

// Create a new course
router.post('/create', async (req, res) => {
  try {
    const {
      name,
      code,
      enrollmentKey,
      topics,
      assessments,
      eligibilityCriteria,
      specialNotes,
      teacherId
    } = req.body;

    // Validate required fields
    if (!name || !code || !enrollmentKey) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, code, and enrollmentKey are required' 
      });
    }

    // Insert course into database
    const [courseResult] = await db.query(
      `INSERT INTO courses (name, code, enrollment_key, eligibility_criteria, special_notes, teacher_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, code, enrollmentKey, eligibilityCriteria || null, specialNotes || null, teacherId || null]
    );

    const courseId = courseResult.insertId;

    // Insert topics if provided
    if (topics && topics.length > 0) {
      const topicValues = topics.map(topic => [
        courseId,
        topic.name,
        topic.hours
      ]);
      
      await db.query(
        `INSERT INTO topics (course_id, name, hours) VALUES ?`,
        [topicValues]
      );
    }

    // Insert assessments if provided
    if (assessments && assessments.length > 0) {
      const assessmentValues = assessments.map(assessment => [
        courseId,
        assessment.name,
        assessment.date,
        assessment.marks,
        assessment.contentCovered || null,
        assessment.structure || null
      ]);
      
      await db.query(
        `INSERT INTO assessments (course_id, name, date, marks, content_covered, structure) VALUES ?`,
        [assessmentValues]
      );
    }

    res.status(201).json({ 
      message: 'Course created successfully',
      courseId: courseId
    });

  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update an existing course
router.put('/update/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      name,
      code,
      enrollmentKey,
      topics,
      assessments,
      eligibilityCriteria,
      specialNotes
    } = req.body;

    // Validate required fields
    if (!name || !code || !enrollmentKey) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, code, and enrollmentKey are required' 
      });
    }

    // Update course
    await db.query(
      `UPDATE courses 
       SET name = ?, code = ?, enrollment_key = ?, eligibility_criteria = ?, special_notes = ?
       WHERE id = ?`,
      [name, code, enrollmentKey, eligibilityCriteria || null, specialNotes || null, courseId]
    );

    // Delete existing topics and assessments
    await db.query(`DELETE FROM topics WHERE course_id = ?`, [courseId]);
    await db.query(`DELETE FROM assessments WHERE course_id = ?`, [courseId]);

    // Insert updated topics
    if (topics && topics.length > 0) {
      const topicValues = topics.map(topic => [
        courseId,
        topic.name,
        topic.hours
      ]);
      
      await db.query(
        `INSERT INTO topics (course_id, name, hours) VALUES ?`,
        [topicValues]
      );
    }

    // Insert updated assessments
    if (assessments && assessments.length > 0) {
      const assessmentValues = assessments.map(assessment => [
        courseId,
        assessment.name,
        assessment.date,
        assessment.marks,
        assessment.contentCovered || null,
        assessment.structure || null
      ]);
      
      await db.query(
        `INSERT INTO assessments (course_id, name, date, marks, content_covered, structure) VALUES ?`,
        [assessmentValues]
      );
    }

    res.json({ 
      message: 'Course updated successfully',
      courseId: courseId
    });

  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Update topic completion status
router.patch('/topics/:topicId/completion', async (req, res) => {
  try {
    const { topicId } = req.params;
    const { completed } = req.body;

    await db.query(
      `UPDATE topics SET completed = ? WHERE id = ?`,
      [completed, topicId]
    );

    res.json({ message: 'Topic completion status updated' });

  } catch (error) {
    console.error('Error updating topic completion:', error);
    res.status(500).json({ error: 'Failed to update topic completion' });
  }
});

// Update assessment completion status
router.patch('/assessments/:assessmentId/completion', async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const { completed } = req.body;

    await db.query(
      `UPDATE assessments SET completed = ? WHERE id = ?`,
      [completed, assessmentId]
    );

    res.json({ message: 'Assessment completion status updated' });

  } catch (error) {
    console.error('Error updating assessment completion:', error);
    res.status(500).json({ error: 'Failed to update assessment completion' });
  }
});

// Update course special notes
router.patch('/:courseId/notes', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { specialNotes } = req.body;

    await db.query(
      `UPDATE courses SET special_notes = ? WHERE id = ?`,
      [specialNotes, courseId]
    );

    res.json({ message: 'Special notes updated successfully' });

  } catch (error) {
    console.error('Error updating notes:', error);
    res.status(500).json({ error: 'Failed to update notes' });
  }
});

export default router;
