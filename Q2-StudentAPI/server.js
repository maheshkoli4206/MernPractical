const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

let students = [
    { id: 1, name: 'Mahesh', course: 'MCA' },
    { id: 2, name: 'Yash', course: 'MCA' }
];

// Display all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Display one student
app.get('/students/:id', (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
});

// Add student
app.post('/students', (req, res) => {
    const student = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name: req.body.name,
        course: req.body.course
    };

    students.push(student);
    res.status(201).json(student);
});

// Update student
app.put('/students/:id', (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    student.name = req.body.name ?? student.name;
    student.course = req.body.course ?? student.course;

    res.json(student);
});

// Delete student
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    students.splice(index, 1);
    res.json({ message: 'Student deleted successfully' });
});

app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});
