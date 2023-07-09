import { 
    Flex, 
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from "@chakra-ui/react";
import { UserIcon } from "@/icons";
import styles from './styles/Navbar.module.css'
import localFont from 'next/font/local'
import { Link } from "@chakra-ui/next-js";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useEnsName, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { goerli } from "viem/chains";

const nothing = localFont({ src: '../public/fonts/Nothing/nothing.ttf' })

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { address, isConnected } = useAccount()
    const ensName = useEnsName(address)
    const { connect } = useConnect({
      connector: new InjectedConnector({ chains:[goerli] }),
    })
    const { disconnect } = useDisconnect()

    useEffect(() => {
        connect()
    }, [isConnected, address])


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
                        {
                            address ? (
                                <>
                                    <MenuItem>
                                        Signed in as: `${address.substring(0,4)}...${address.substring(address.length-4, address.length)}`
                                    </MenuItem>
                                    <MenuItem onClick={() => disconnect()}>Sign Out</MenuItem>
                                </>
                            ) : (
                                <MenuItem onClick={onOpen}>Sign In</MenuItem>
                            )
                        }
                    </MenuList>
                </Menu>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color="black">
                    <ModalHeader>Sign In</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction="column" gap={3}>
                            <p>Sign in with your wallet</p>
                            <Button colorScheme="blue" onClick={() => {connect(); onClose()}}>Connect Wallet</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}