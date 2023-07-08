const Post = async (url:string, data:string) => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export const postMethod = {
    createComment: (id:string, address:string, data:string) => {
        return Post(`http://localhost:8000/services/${id}/comments?comment=${data}&user_address=${address}`, '')
    },
    challenge: (address:string, chain:string) => {
        return Post(`http://localhost:8000/authorization/challenge?address=${address}&chain=${chain}`, '')
    },
    solve: (address:string, chain:string, signature:string) => {
        return Post(`http://localhost:8000/authorization/solve?address=${address}&chain=${chain}&signature=${signature}`, '')
    },
    refresh: (token:string) => {
        return Post(`http://localhost:8000/authorization/refresh?token=${token}`, '')
    }
}

