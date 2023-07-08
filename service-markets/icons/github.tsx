import { AiFillGithub } from 'react-icons/ai';

export default function GithubIcon ({size, extraStyles, onClick}:any) {
    return (
        <AiFillGithub 
            name = 'github'
            style={{
                fontSize: size,
                color: '#FFF',
                ...extraStyles
            }}
            onClick={onClick}
        />
    )
}