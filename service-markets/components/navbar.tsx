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
import { useAccount, useConnect, useEnsName, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter } from "next/router";
import { postMethod } from "@/utils";
import Cookies from "universal-cookie";
import { SafeAuthKit, Web3AuthModalPack } from '@safe-global/auth-kit';
import { Web3AuthOptions } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { WALLET_ADAPTERS } from "@web3auth/base";

// https://dashboard.web3auth.io/
// const WEB3_AUTH_CLIENT_ID=process.env.REACT_APP_WEB3_AUTH_CLIENT_ID!

// // https://web3auth.io/docs/sdk/web/modal/initialize#arguments
// const options: Web3AuthOptions = {
//   clientId: WEB3_AUTH_CLIENT_ID,
//   web3AuthNetwork: 'testnet',
//   chainConfig: {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: '0x5',
//     // https://chainlist.org/
//     rpcTarget: `https://rpc.ankr.com/eth_goerli`
//   },
//   uiConfig: {
//     theme: 'dark',
//     loginMethodsOrder: ['google', 'facebook']
//   }
// }

// // https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters
// const modalConfig = {
//   [WALLET_ADAPTERS.TORUS_EVM]: {
//     label: 'torus',
//     showOnModal: false
//   },
//   [WALLET_ADAPTERS.METAMASK]: {
//     label: 'metamask',
//     showOnDesktop: true,
//     showOnMobile: false
//   }
// }

// // https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization
// const openloginAdapter = new OpenloginAdapter({
//   loginSettings: {
//     mfaLevel: 'mandatory'
//   },
//   adapterSettings: {
//     uxMode: 'popup',
//     whiteLabel: {
//       name: 'Safe'
//     }
//   }
// })

// const pack = new Web3AuthModalPack(options, [openloginAdapter], modalConfig)

const nothing = localFont({ src: '../public/fonts/Nothing/nothing.ttf' })

export default function Navbar() {
    const cookies = new Cookies()
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { address, isConnected } = useAccount()
    const [challenge, setChallenge] = useState("")
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()

    useEffect(() => {
        connect()
        if (isConnected) {
            postMethod.challenge(address, "ETH").then((res) => {
                setChallenge(res.challenge)
            })
        }
    }, [isConnected, address])

    const {signMessage} = useSignMessage({ message: challenge, onSuccess(data, variables, context) {
        postMethod.solve(address, "ETH", data).then((res) => {
            if (res) {
                cookies.set("bearerToken", res.token, {path: "/", maxAge: res.valid_til})
                console.log(cookies.get("bearerToken"))
            }
        })
    },})

    useEffect(() => {
        if (challenge && !cookies.get("bearerToken")) {
            signMessage()
        }
    }, [challenge])

    // const safeAuthKit = await SafeAuthKit.init(pack, {
    //     txServiceUrl: 'https://safe-transaction-goerli.safe.global'
    //   })

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
                                        Signed in as:
                                        {address.substring(0,4)}...{address.substring(address.length-4, address.length)}
                                    </MenuItem>
                                    <MenuItem onClick={()=>router.push("/dashboard")}>
                                        Dashboard
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