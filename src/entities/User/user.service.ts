import { apiClient, ApiResponse } from '@/shared';
import { AuthParams } from './types';   

const refreshToken = async () => {
    try{
        const response = await apiClient.post('/auth/refresh_token');
        const access_token = response.data
        console.log(response.data)
        localStorage.setItem('user-token', JSON.stringify({
            state: {
                token: access_token
            }
        }))
        return access_token
    }catch(e){
        console.log(e)
    }
}

apiClient.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; 

        try {
            const newAccessToken = await refreshToken(); 
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest); 
        } catch (refreshError) {
            console.error('Не удалось обновить токены:', refreshError);
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
});

export const userService = {
    postAuth: (
        params: AuthParams
    ): ApiResponse<any> => {
        return apiClient.post<any>('auth/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
    },
    
    getMeStudent: (token:void): ApiResponse<any> => {
        return apiClient.get<any>('user/me/student', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
