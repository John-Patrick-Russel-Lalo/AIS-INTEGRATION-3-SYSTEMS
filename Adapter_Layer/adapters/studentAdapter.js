

export const getStudentProfile = async function(id) {
    try {
        const response = await fetch(`https://ais-simulated-legacy.onrender.com/api/students/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching student profile:', error);
        throw error;
    }
}

export const getAllCourse = async function() {
    try {
        const response = await fetch(`https://ais-simulated-legacy.onrender.com/api/course`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
}

export default {
    getStudentProfile,
    getAllCourse
}



