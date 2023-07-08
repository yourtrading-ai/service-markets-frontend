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
        return PUT(`http://localhost:8000/services`, data)
    },
    voteService: (id: string, data: any, vote:number) => {
        return PUT(`http://localhost:8000/services/${id}/vote?user_address=${data.owner_address}&vote=${vote}`, data)
    },
    voteComment: (id: string, commentId: string, data: any, vote:number) => {
        return PUT(`http://localhost:8000/services/${id}/comments/${commentId}/vote?user_address=${data.owner_address}&vote=${vote}`, data)
    }
}