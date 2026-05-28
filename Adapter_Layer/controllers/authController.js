import * as AuthService from "../services/authService.js";

export const registerStudent = async (req, res) => {
    const {firstName, lastName, dob, course, major, status, address} = req.body;
    try{
        const studentProfile = {
            firstName, lastName, dob, course, major, status, address
        }

        const result = await AuthService.registerStudent(studentProfile);
        return res.status(200).json({
            success: true,
            message: result
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "An error occurred while registering the student: " + error.message
        });
    }
}


export const loginStudent = async (req, res) => {
    const {id} = req.body;
    console.log("Received login request for student ID:", id);
    try {
        const token = await AuthService.loginStudent(id);
        return res.status(200).json({
            success: true,
            token: token
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "An error occurred while logging in the student: " + error.message
        });
    }
}

