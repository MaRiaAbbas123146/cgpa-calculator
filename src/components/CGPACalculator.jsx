import React, { useState } from 'react';
import { Trash2, Plus, Calculator, RotateCcw } from 'lucide-react';

const CGPACalculator = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [grade, setGrade] = useState('');
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState('');

  // Grade to point mapping
  const gradePoints = {
    'A+': 4.0, 'A': 3.7, 'B+': 3.3, 'B': 3.0,
    'C+': 2.7, 'C': 2.3, 'D': 2.0, 'F': 0.0
  };

  const validGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];

  const validateInputs = () => {
    if (!courseName.trim()) {
      setError('Course name is required');
      return false;
    }
    if (!creditHours || parseFloat(creditHours) <= 0) {
      setError('Credit hours must be a positive number');
      return false;
    }
    if (!grade) {
      setError('Please select a grade');
      return false;
    }
    if (!validGrades.includes(grade.toUpperCase())) {
      setError('Invalid grade. Please use: A+, A, B+, B, C+, C, D, F');
      return false;
    }
    setError('');
    return true;
  };

  const addCourse = () => {
    if (!validateInputs()) return;

    const newCourse = {
      id: Date.now(),
      name: courseName.trim(),
      credits: parseFloat(creditHours),
      grade: grade.toUpperCase(),
      points: gradePoints[grade.toUpperCase()]
    };

    setCourses([...courses, newCourse]);
    setCourseName('');
    setCreditHours('');
    setGrade('');
    setCgpa(null);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    setCgpa(null);
  };

  const calculateCGPA = () => {
    if (courses.length === 0) {
      setError('Please add at least one course');
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      totalPoints += course.points * course.credits;
      totalCredits += course.credits;
    });

    const calculatedCGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    setCgpa(calculatedCGPA);
    setError('');
  };

  const resetAll = () => {
    setCourses([]);
    setCourseName('');
    setCreditHours('');
    setGrade('');
    setCgpa(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-indigo-600 text-center mb-2">
            CGPA Calculator
          </h1>
          <p className="text-gray-600 text-center">
            Add your courses and calculate your Cumulative Grade Point Average
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Course</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g., Data Structures"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Hours
              </label>
              <input
                type="number"
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
                placeholder="e.g., 3"
                min="0"
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Grade</option>
                {validGrades.map(g => (
                  <option key={g} value={g}>{g} ({gradePoints[g]})</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <button
            onClick={addCourse}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Course
          </button>
        </div>

        {/* Courses List */}
        {courses.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Courses</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Course Name</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Credit Hours</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Points</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">{course.name}</td>
                      <td className="py-3 px-4 text-center">{course.credits}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold">
                          {course.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-semibold">{course.points}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={calculateCGPA}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator size={20} />
                Calculate CGPA
              </button>
              <button
                onClick={resetAll}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </div>
        )}

        {/* CGPA Result */}
        {cgpa !== null && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-semibold mb-2">Your CGPA</h2>
            <div className="text-6xl font-bold mb-2">{cgpa}</div>
            <p className="text-lg opacity-90">
              Based on {courses.length} course{courses.length !== 1 ? 's' : ''}
            </p>
            <p className="text-sm opacity-80 mt-2">
              Total Credits: {courses.reduce((sum, c) => sum + c.credits, 0)}
            </p>
          </div>
        )}

        {/* Grade Reference */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Grade Point Reference</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(gradePoints).map(([grade, points]) => (
              <div key={grade} className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="font-bold text-indigo-600 text-lg">{grade}</div>
                <div className="text-gray-600">{points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;