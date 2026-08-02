const {
    firstName,
    lastName,
    email,
    password,
    phoneCode,
    phone
} = req.body;

await registerUser(
    firstName,
    lastName,
    email,
    password,
    phoneCode,
    phone

        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const result = await loginUser(
            email,
            password
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }

};

const forgotPasswordController = async (req, res) => {

    try {

        const { email } = req.body;

        const result = await forgotPassword(email);

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const resetPasswordController = async (req, res) => {

    try {

        const { token, password } = req.body;

        const result = await resetPassword(
            token,
            password
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {

    register,

    login,

    forgotPassword: forgotPasswordController,

    resetPassword: resetPasswordController

};
