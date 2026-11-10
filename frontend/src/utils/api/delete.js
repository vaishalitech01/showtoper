import axiosInstance from "./axiosInstance";

export const apiDeleteRequest = async (request) => {
   
        console.log("Calling delete API:", request);
            const response = await axiosInstance.delete(request.apiUrl, {
            headers: {
                "accept": "*/*",
                "content-type": request.content_type
            },
            data: request.data,
        });

        // Log the raw response for debugging
        console.log("Raw Delete API Response:", response.data);

        return response; // Axios automatically parses JSON
   
};