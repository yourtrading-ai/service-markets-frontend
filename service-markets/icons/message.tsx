import { AiOutlineMessage } from 'react-icons/ai';

export default function MessageIcon ({size, extraStyles, onClick}:any) {
    return (
        <AiOutlineMessage 
            name = 'message'
            style={{
                fontSize: size,
                color: '#000',
                ...extraStyles
            }}
            onClick={onClick}
        />
    )
}