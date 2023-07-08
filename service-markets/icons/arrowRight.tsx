import { AiOutlineRight } from 'react-icons/ai';

export default function ArrowRightIcon({size, extraStyles, onClick}:any) {
    return (
        <AiOutlineRight 
            name = 'arrowRight'
            style={{
                fontSize: size,
                color: '#FFF',
                strokeWidth: '3rem',
                ...extraStyles
            }}
            onClick={onClick}
        />
    )
}