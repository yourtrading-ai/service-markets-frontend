import { AiOutlineArrowDown } from 'react-icons/ai'

export default function ArrowDownIcon ({size, extraStyles, onClick}:any) {
    return (
        <AiOutlineArrowDown 
            name = 'arrowDown'
            style={{
                fontSize: size,
                color: '#000',
                ...extraStyles
            }}
            onClick={onClick}
        />
    )
}