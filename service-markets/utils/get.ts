const Get = async (url:string) => {
    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    return await response.json();
}

export const getMethod = {
    allListings: () => {
        return Get('http://localhost:8000/services')
    },
    listing: (id:string) => {
        return Get(`http://localhost:8000/services/${id}`)
    },
    comments: (id:string) => {
        return Get(`http://localhost:8000/services/${id}/comments`)
    }
}

