import Cookies from "universal-cookie/cjs/Cookies";

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
        return PUT(`http://localhost:8000/services`, data)
    },
    voteService: (id: string, user: any, vote:string) => {
        return PUT(`http://localhost:8000/services/${id}/vote?user_address=${user}&vote=${vote}`, "")
    },
    voteComment: (id: string, commentId: string, user: any, vote:string) => {
        return PUT(`http://localhost:8000/services/${id}/comments/${commentId}/vote?user_address=${user}&vote=${vote}`, "")
    }
}