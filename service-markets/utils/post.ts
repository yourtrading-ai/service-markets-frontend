import { id } from "ethers/lib/utils";
import { API_URL } from ".";

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
        return Post(API_URL + `/services/${id}/comments?comment=${data}&user_address=${address}`, '')
    },
    validateTransaction: (txnHash: string, serviceId: string) => {
        return Post(API_URL + `/services/validateTransaction?txn_hash=${txnHash}&service_id=${serviceId}`, '')
    }
}

