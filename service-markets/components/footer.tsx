import { Flex, Spacer, Link } from "@chakra-ui/react";
import { GitHubIcon } from "@/icons";
import styles from './styles/Footer.module.css'

export default function Footer() {
    return (
        <Flex className={styles.footer}>
            <Spacer />
            <Flex p="4" gap="5" alignItems="center" fontSize="2xl" fontWeight="bold">
            <Link href="https://github.com/yourtrading-ai/service-markets-frontend" isExternal>
                <GitHubIcon size="3rem"/>
            </Link>
            </Flex>
        </Flex>
    )
}