const bcrypt = require("bcrypt");
const { prisma } = require("../config/database");
const { generateToken } = require("../utils/jwt");



const registerUser = async (name, email, password) => {


    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });


    if (existingUser) {
        throw new Error("Email already registered");
    }


    const hashedPassword = await bcrypt.hash(
        password,
        10
    );


    const user = await prisma.user.create({

        data: {

            name,

            email,

            password: hashedPassword

        }

    });


    const token = generateToken(user.id);


    return {

        user: {

            id: user.id,

            name: user.name,

            email: user.email,

            role: user.role

        },

        token

    };

};




const loginUser = async (email, password) => {


    const user = await prisma.user.findUnique({

        where: {
            email
        }

    });


    if (!user) {

        throw new Error("Invalid email or password");

    }



    const passwordMatch = await bcrypt.compare(

        password,

        user.password

    );



    if (!passwordMatch) {

        throw new Error("Invalid email or password");

    }



    const token = generateToken(user.id);



    return {

        user: {

            id: user.id,

            name: user.name,

            email: user.email,

            role: user.role

        },

        token

    };


};




module.exports = {

    registerUser,

    loginUser

};