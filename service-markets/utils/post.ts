const Post = async (url:string, data:string) => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export const postMethod = {
    createListing: (data:string) => {
        return Post('/api/createListing', data)
    },
    createComment: (id:string, data:string) => {
        return Post('/api/createComment', data)
    },
    createVote: (id:string, data:string, type:string) => {
        return Post(`/api/createVote/${type}`, data)
    }
}

