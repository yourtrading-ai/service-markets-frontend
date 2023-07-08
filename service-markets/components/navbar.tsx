import { 
    Flex, 
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { UserIcon } from "@/icons";
import styles from './styles/Navbar.module.css'
import localFont from 'next/font/local'
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/next-js";

const nothing = localFont({ src: '../public/fonts/Nothing/nothing.ttf' })

export default function Navbar() {
    const router = useRouter();

    return (
        <Flex className={styles.navBar}>
            <Link href="/" _hover={{border:"none"}}>
                <span className={`${nothing.className} ${styles.brandName}`}>
                    service
                </span>
                <span className={`${nothing.className} ${styles.brandNameDot}`}>
                    .
                </span>
                <span className={`${nothing.className} ${styles.brandName}`}>
                    markets
                </span>
            </Link>
            <Spacer />
            <Flex p="4" gap="5" alignItems="center" fontSize="3xl" fontWeight="bold">
                <Link href="/about">About</Link>
                <Link href="/docs">Docs</Link>
                <Menu>
                    <MenuButton>
                        <UserIcon size="3rem"/>
                    </MenuButton>
                    <MenuList color="black" fontSize="md">
                        <MenuItem>SignIn</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}