

export const getStudentProfile = async function(id) {
    try {
        const response = await fetch(`http://localhost:3500/api/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error fetching student profile:', error);
        throw error;
    }
}

export const getAllCourse = async function() {
    try {
        const response = await fetch(`http://localhost:3500/api/course`);
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