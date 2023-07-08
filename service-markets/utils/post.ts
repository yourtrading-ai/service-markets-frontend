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
    }
}

