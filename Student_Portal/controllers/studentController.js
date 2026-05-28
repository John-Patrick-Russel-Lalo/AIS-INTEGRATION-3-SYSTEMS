import { getStudentProfile } from '../models/studentModel.js';
import { getAllCourse } from '../models/studentModel.js';

export const getProfile = async function(req, res) {
    const {id} = req.body;
    console.log("Received login request for student ID:", id);
    try {
        const profile = await getStudentProfile(id);
        return res.status(200).json(profile);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "An error occurred while logging in the student: " + error.message
        });
    }
}

export const getCourse = async function(req, res) {
    try {
        const course = await getAllCourse();
        return res.status(200).json(course);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "An error occurred while logging in the student: " + error.message
        });
    }
}

export default {
    getProfile,
    getCourse
}