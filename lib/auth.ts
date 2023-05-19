import { jwtVerify } from  "jose"

interface UserJwtPayload {
    jti :string,
    iat: number
}
export const getJwtSecretKey = () =>{
    
    const secret = process.env.JWT_SECRET_KEY;
    console.log(secret,'secret')
    if(!secret || secret.length === 0){
        throw new Error('dont match JWT_SECRET_KEY')
    }

    return secret
}

export const verifyAuth = async (token: string)=>{
 
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
    console.log(verified.payload,'verified')
    try {
        return verified.payload as UserJwtPayload
    } catch (error) {
        throw new Error('your token has expired')
    }

} 
