import Cookies from "universal-cookie/cjs/Cookies";
import { API_URL } from ".";

const cookies = new Cookies();

const PUT = async (url: string, body: any) => {
    const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.get("bearerToken")
        },
        credentials: "include",
        body: JSON.stringify(body),
    });
    return await response.json();
}

export const putMethod = {
    updateListing: (data: any) => {
        return PUT(API_URL + `/services`, data)
    },
    voteService: (id: string, user: any, vote:string) => {
        return PUT(API_URL + `/services/${id}/vote?user_address=${user}&vote=${vote}`, "")
    },
    voteComment: (id: string, commentId: string, user: any, vote:string) => {
        return PUT(API_URL + `/services/${id}/comments/${commentId}/vote?user_address=${user}&vote=${vote}`, "")
    }
}