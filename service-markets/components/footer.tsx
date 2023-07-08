import { Flex, Spacer } from "@chakra-ui/layout";
import { GitHubIcon } from "@/icons";
import styles from './styles/Footer.module.css'

export default function Footer() {
    return (
        <Flex className={styles.footer}>
            <Spacer />
            <Flex p="4" gap="5" alignItems="center" fontSize="2xl" fontWeight="bold">
            <GitHubIcon size="3rem"/>
            </Flex>
        </Flex>
    )
}