import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getUser = async (id, conn) => {
  if (parseInt(id) <= 0) {
    throw new Error("Invalid user ID");
  }
  const [user] = await conn.query("SELECT * FROM usertable WHERE id = ?", [id]);
  return user;
}

export const insertUser = async (userProfile, email, password, conn) => {

  
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  if (email.trim() === "" || password.trim() === "") {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  

  const [user] = await conn.query("SELECT * FROM usertable WHERE email = ?", [
    email,
  ]);
  console.log(user)
  if (user.length === 1) {
    const error = new Error(`Email ${email} is already in use`);
    error.status = 400;
    throw error;
  }

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  const response = await fetch(
    `http://localhost:3500/auth/register`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile),
    }
  )

  const data = await response.json();
  console.log("data: ", data);
  console.log("studentID: ", data.message._id);
  const studentID = data.message._id;
  
  const [result] = await conn.query(
  "INSERT INTO usertable (id, email, password) VALUES (?, ?, ?)",
  [studentID, email, hashedPassword]
);

return result;

};



export const loginUser = async (email, password, conn) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
    if (email.trim() === "" || password.trim() === "") {
    throw new Error("All fields are required");
    }
    const [user] = await conn.query("SELECT * FROM usertable WHERE email = ?", [email]);
    console.log(user)

    if (user.length === 0) {
        const error = new Error("Invalid email or password");
        error.status = 400;
        throw error;
    }

    const token = jwt.sign(
        { id: user[0].id, email: user[0].email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    const isPasswordValid = await bcrypt.compareSync(password, String(user[0].password));
    console.log(password, email)
    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.status = 400;
        throw error;
    }
    
    const response = await fetch(
        `http://localhost:3500/auth/login`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({ id: user[0].id }),
        }
      )
    

    console.log("Generated Token:", token);
    console.log("User ID:", user[0].id);
    return token
}

export default {
  insertUser,
  loginUser
};

