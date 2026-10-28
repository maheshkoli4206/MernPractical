
import { useEffect, useState } from 'react';

function App() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/students')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                return response.json();
            })
            .then(data => setStudents(data))
            .catch(() => setError('Unable to connect to backend'));
    }, []);

    return (
        <div style={{ padding: '30px' }}>
            <h1>Student Management System</h1>

            {error && <p>{error}</p>}

            {students.map(student => (
                <div key={student.id}>
                    <p>
                        ID: {student.id} |
                        Name: {student.name} |
                        Course: {student.course}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default App;
