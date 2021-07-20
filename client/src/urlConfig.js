// ! Export base url
export const API='http://localhost:3000/api'

// ! Export function to show product photos
export const generatePublicUrl=(fileName)=>{
    return `http://localhost:3000/public/${fileName}`;
}