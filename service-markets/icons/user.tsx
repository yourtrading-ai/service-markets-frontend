import { ComponentProps } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

export default function UserIcon ({size, extraStyles, onClick}:any) {
    return (
        <AiOutlineUser 
            name = 'user'
            style={{
                fontSize: size,
                color: '#FFF',
                ...extraStyles
            }}
            onClick={onClick}
        />
    )
}