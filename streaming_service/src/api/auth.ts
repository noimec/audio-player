import axios from "axios";

export const auth = async (): Promise<string | undefined> => {
    try {
        const registerResponse = await axios.post('http://localhost:3000/api/auth/register', {
            "username": "stepan",
            "password": "fingertraxx",
            "firstName": "stepan",
            "lastName": "karelin"
        });

        const { access_token } = registerResponse.data;

        return access_token;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            return await login()
        } else {
            console.error('Error during registration:', error);
        }
    }
};

export const login = async (): Promise<string | undefined> => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            username: 'stepan',
            password: 'fingertraxx'
        });
        const { access_token } = response.data;

        return access_token;
    } catch (error) {
        console.error('Error during login:', error);
    }
};