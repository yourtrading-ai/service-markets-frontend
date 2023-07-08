import { AiOutlineArrowUp } from 'react-icons/ai'

export default function ArrowUpIcon ({size, color, extraStyles, onClick}:any) {
    return (
        <AiOutlineArrowUp 
            name = 'arrowUp'
            style={{
                fontSize: size,
                color: '#000',
                ...extraStyles
            }}
            onClick={onClick}
        />
    )
}