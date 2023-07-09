import { mockListings, mockComments } from "./mockData";
import { colorSchemes, getRandomColorScheme } from "./colorSchemes";
import { getMethod } from "./get";
import { postMethod } from "./post";
import { putMethod } from "./put";

const API_URL = "http://localhost:8000"

export {
    mockListings,
    mockComments,
    colorSchemes,
    getRandomColorScheme,
    getMethod,
    postMethod,
    putMethod,
    API_URL
}