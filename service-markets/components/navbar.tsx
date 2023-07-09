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
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast
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
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, ADAPTER_EVENTS } from "@web3auth/base";
import { ethers } from "ethers";

const WEB3_AUTH_CLIENT_ID="BGEFF3QdjKYaKS18laS1g_fxHxXetAufvAzaA6blCzEoW-cuEuzpTJzrsVxGb1Zr_ruNx-lLYDTrn9EwveJyPv8"

const options: Web3AuthOptions = {
  clientId: WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: 'testnet',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x5',
    // https://chainlist.org/
    rpcTarget: `https://rpc.ankr.com/eth_goerli`
  },
  uiConfig: {
    theme: 'dark',
    loginMethodsOrder: ['google', 'facebook']
  }
}

// https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters
const modalConfig = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: 'torus',
    showOnModal: false
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: 'metamask',
    showOnDesktop: true,
    showOnMobile: false
  }
}

// https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization
const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: 'mandatory'
  },
  adapterSettings: {
    uxMode: 'popup',
    whiteLabel: {
      name: 'Safe'
    }
  }
})

const pack = new Web3AuthModalPack(options, [openloginAdapter], modalConfig)

const nothing = localFont({ src: '../public/fonts/Nothing/nothing.ttf' })

export default function Navbar() {
    const toast = useToast()
    const cookies = new Cookies()
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const { address, isConnected } = useAccount()
    const [challenge, setChallenge] = useState("")
    const [safeAuthKit, setSafeAuthKit] = useState<SafeAuthKit>()
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any>()
    const [eoa, setEoa] = useState<any>()
    const [ isConnected, setIsConnected ] = useState(false)
    // const { connect } = useConnect({
    //   connector: new InjectedConnector(),
    // })
    // const { disconnect } = useDisconnect()

    // useEffect(() => {
    //     connect()
    //     if (isConnected) {
    //         postMethod.challenge(address, "ETH").then((res) => {
    //             setChallenge(res.challenge)
    //         })
    //     }
    // }, [isConnected, address])

    useEffect(() => {
        async function gnosisInit() {
            setSafeAuthKit(
                await SafeAuthKit.init(pack, {
                    txServiceUrl: 'https://safe-transaction-goerli.safe.global'
                })
            )
        }
        gnosisInit()
    }, [])

    useEffect(() => {
        if (safeAuthKit) {
            safeAuthKit.subscribe(ADAPTER_EVENTS.CONNECTED, async () => {
                console.log('User is authenticated');
                setIsConnected(true)
            });
              
            safeAuthKit.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
                console.log('User is not authenticated');
            });
        }
    }, [safeAuthKit])

    useEffect(() => {
        if (safeAuthSignInResponse) {
            setEoa(safeAuthSignInResponse.eoa)
        }
    }, [safeAuthSignInResponse])

    useEffect(() => {
        if (eoa) {
            postMethod.challenge(eoa, "ETH").then((res) => {
                setChallenge(res.challenge)
            })
        }
    }, [eoa])

    const gnosisConnect = async () => {
        await safeAuthKit.signIn().then((res) => {
            console.log(res);
            setSafeAuthSignInResponse(res);
        });
    }

    const gnosisDisconnect = async () => {
        await safeAuthKit.signOut();
        setEoa(null)
    }

    const gnosisGetUserInfo = async () => {
        const userInfo = await safeAuthKit.getUserInfo();
        console.log(userInfo);
    }

    const gnosisGetSigner = async () => {
        const signer = provider?.getSigner();
        console.log(signer);
    }
    
    const setNewProvider = async () => {
        const safeProvider = safeAuthKit.getProvider();
        let newProvider = new ethers.providers.Web3Provider(safeProvider)
        setProvider(newProvider)
    }

    const signMessageAuthKit = async (msg:string) => {
        setNewProvider()
        const signer = provider?.getSigner();
        const signedMessage = await signer?.signMessage(msg);
        console.log(signedMessage);
        postMethod.solve(eoa, "ETH", signedMessage).then((res) => {
            if (res.token != undefined) {
                console.log("Challenge Solved")
                cookies.set("bearerToken", res.token, {path: "/", maxAge: res.valid_til})
                console.log("Bearer Token: " + cookies.get("bearerToken"))
                onClose()
                toast({
                    title: "Authentication Successful",
                    description: "You are now authenticated",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                
            } else {
                console.log("Challenge Not Solved")
            }
        })
    }

    const signChallenge = async (msg) => {
        console.log("Signing Message")
        signMessageAuthKit(msg)
    }


    const startChallenge = async () => {
        console.log(eoa)
        postMethod.challenge(eoa, "ETH").then((res) => {
            console.log(res)
            setChallenge(res.challenge)
            signChallenge(res.challenge)
        })
    }

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
                            eoa && cookies.get("bearerToken") ? (
                                <>
                                    <MenuItem>
                                        Signed in as:
                                        {eoa.substring(0,4)}...{eoa.substring(eoa.length-4, eoa.length)}
                                    </MenuItem>
                                    <MenuItem onClick={()=>router.push("/dashboard")}>
                                        Dashboard
                                    </MenuItem>
                                    <MenuItem onClick={() => {gnosisDisconnect(); onClose()}}>Sign Out</MenuItem>
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
                            {
                                isConnected ? (
                                    <>
                                        <p>
                                            Verify
                                        </p>
                                        <Button colorScheme="blue" onClick={() => {
                                            startChallenge();
                                            }}>sign</Button>
                                    </>
                                ) : (
                                    <>
                                        <p>Sign in with your wallet</p>
                                        <Button colorScheme="blue" onClick={() => {
                                            // connect(); 
                                            gnosisConnect();
                                        }}>Connect Wallet</Button>
                                    </>
                                )
                            }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}