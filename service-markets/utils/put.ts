import { API_URL } from ".";

const PUT = async (url: string, body: any) => {
    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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