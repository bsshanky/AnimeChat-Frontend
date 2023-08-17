import axios from 'axios';

class MessagesDataService {

    getMessagesByGroupId(groupId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/animechat`, {
            params: { groupId: groupId }         
        }); 
    }

    addMessage(groupId, senderName, senderId, message) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/animechat`, {
            groupId: groupId,
	        senderName: senderName, 
            senderId: senderId,
            message: message
        }); 
    }

    deleteMessage(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/animechat`, {data}); 
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new MessagesDataService();