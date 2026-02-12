import axios from 'axios'
import { auth } from '../firebaseClient'
const baseUrl = 'http://localhost:3001/image'

// Upload and get images from server. Everything is transferred as base64 strings.

const upload = async (image) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User not authenticated");
    }
    const token = await user.getIdToken();

    const response = await axios.post(
        `${baseUrl}/upload`, { image: image }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    return response.data;
}

const getFeatured = async () => {
    const response = await axios.get(`${baseUrl}/featured`)
    console.log(response.data)
    return response.data;
}

export { upload, getFeatured }

