const Get = async (url:string) => {
    const response = await fetch(url);
    return await response.json();
}

export const getMethod = {
    allListings: () => {
        return Get('http://localhost:8000/services')
    },
    listing: (id:string) => {
        return Get(`/api/listing/${id}`)
    },
    comments: (id:string) => {
        return Get(`/api/comments/${id}`)
    },
    votes: (id:string) => {
        return Get(`/api/votes/${id}`)
    }

}

