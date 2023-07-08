export const colorSchemes = [
    'pink',
    'linkedin',
    'facebook',
    'messenger',
    'whatsapp',
    'twitter',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'telegram',
]

export function getRandomColorScheme() {
    return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
}