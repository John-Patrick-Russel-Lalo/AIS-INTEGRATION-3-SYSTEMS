export const create = async (profile) => {
    const transformedProfile = {
        name: profile.firstName + " " + profile.lastName,
        birthdate: profile.dob,
        "program": profile.course + " " + profile.major,
        "address": profile.address,
        "studentStatus": profile.status,
    }

    console.log(transformedProfile);


    const Response = await fetch(`https://ais-simulated-legacy.onrender.com/api/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transformedProfile)
    });

    return await Response.json();
}


export const loginStudent = async (id) => {
    const Response = await fetch(`https://ais-simulated-legacy.onrender.com/api/students/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("Login response:", Response.status, await Response.text());
    return await Response.json();
}

