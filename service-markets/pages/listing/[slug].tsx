import Head from 'next/head'
import styles from '@/styles/ListingPage.module.css'
import { Box, Text, Button, Flex, Heading, Stack, useToast, Tag, Input, Image } from '@chakra-ui/react'
import '@fontsource/fira-mono'
import '@fontsource/oxygen-mono'
import localFont from 'next/font/local'
import { UserIcon, ArrowUpIcon, ArrowDownIcon, MessageIcon } from '@/icons'
import { useRouter } from "next/router";
import { mockListings, mockComments } from "@/utils";
import { useEffect, useState } from "react";
import { postMethod, getMethod, putMethod} from '@/utils'
import { useAccount } from 'wagmi'
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { useWalletClient } from "wagmi";
import { Types, Utils } from "@requestnetwork/request-client.js";
import {
    approveErc20,
    hasErc20Approval,
    hasSufficientFunds,
    payRequest,
} from '@requestnetwork/payment-processor';

export default function Listing() {
    const router = useRouter();
    const { slug } = router.query;
    const [listingData, setListingData] = useState({} as any);
    const [comments, setComments] = useState([] as any[]);
    const [inputComment, setInputComment] = useState("");
    const toast = useToast();
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()
    const { data: walletClient } = useWalletClient();

    useEffect(() => {
        if (slug != undefined) {
            getMethod.allListings().then((res) => {
                res.forEach((listing:any) => {
                    if (listing.item_hash == slug) {
                        setListingData(listing);
                    } else if (listing.name == slug) {
                        setListingData(listing);
                    }
                })
            })
        }
    }, [slug]);

    useEffect(() => {
        if (listingData.item_hash != undefined) {
            getMethod.comments(listingData.item_hash).then((res) => {
                setComments(res);
            })
        }
    }, [listingData]);

    const buyService = async () => {
        const signatureProvider = new Web3SignatureProvider(walletClient);
        const requestClient = new RequestNetwork({
            nodeConnectionConfig: {
                baseURL: "https://goerli.gateway.request.network/",
            },
            signatureProvider,
        });
        const zeroAddress = '0x0000000000000000000000000000000000000000';
        const payeeAddress = '0x91313eb16bb6fa6237E191670Bf953309639A028';
        const requestCreateParameters: Types.ICreateRequestParameters = {
          requestInfo: {
            currency: {
              type: Types.RequestLogic.CURRENCY.ERC20,
              value: '0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc',
              network: 'goerli',
            },
            expectedAmount: listingData.price,
            payee: {
              type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
              value: payeeAddress,
            },
            payer: {
              type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
              value: walletClient?.account.address || '',
            },
            timestamp: Utils.getCurrentTimestampInSecond(),
          },
          paymentNetwork: {
            id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
            parameters: {
              paymentNetworkName: 'goerli',
              paymentAddress: payeeAddress,
              feeAddress: zeroAddress,
              feeAmount: '0',
            },
          },
          contentData: {
            reason: listingData.item_hash,
          },
          signer: {
            type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            value: walletClient?.account.address || '',
          },
        };

        const request = await requestClient.createRequest(requestCreateParameters);
        await request.waitForConfirmation();
        const requestData = request.getData();
        if (!(await hasSufficientFunds(requestData, walletClient?.account.address || ''))) {
            throw new Error('You do not have enough funds to pay this request');
        }
        if (!(await hasErc20Approval(requestData, walletClient?.account.address || ''))) {
            const approvalTx = await approveErc20(requestData);
            await approvalTx.wait(1);
        }
        console.log(requestData)
        const tx = await payRequest(requestData);
        await putMethod.validateTransaction(tx.hash, listingData.item_hash);
        toast({
            title: "Service Purchased",
            description: "You have successfully purchased this service",
            status: "success",
            duration: 9000,
            isClosable: true,
        })
    }

    const manageComment = () => {
        if (inputComment != "") {
            postMethod.createComment(listingData.item_hash, address.toString(), inputComment).then((res) => {
                toast({
                    title: "Comment Posted",
                    description: "Your comment has been posted",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    onCloseComplete: () => {
                        router.reload();
                    }
                })
                setInputComment("");
            })
        }
    }

    const serviceVote = (vote:string) => {
        putMethod.voteService(listingData.item_hash, address, vote).then((res) => {
            toast({
                title: "Vote Submitted",
                description: "Your vote has been submitted",
                status: "success",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => {
                    router.reload();
                }
            })
        })
    }

    const commentVote = (commentHash:string, vote:string) => {
        putMethod.voteComment(listingData.item_hash, commentHash, address, vote).then((res) => {
            toast({
                title: "Vote Submitted",
                description: "Your vote has been submitted",
                status: "success",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => {
                    router.reload();
                }
            })
        })
    }


    return (
        <>
            <Head>
                <title>{slug}</title>
                <meta name="description" content="A Marketplace for all your service needs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex className={styles.pageBody}>  
                <div>
                    {
                        listingData.name ? (
                            <Box>
                                 <Stack direction="row" spacing="8" px={4}>
                                    <Image src={listingData.image_url == "" ? "../skeletonImage.jpg" : listingData.image_url} alt={listingData.name} width={700}/>
                                    <Flex direction="column" gap="4">
                                        <Flex>
                                            <Heading as="h3" size="xl">{listingData.name}</Heading>
                                            <Flex gap="4" ml="10">
                                                {
                                                    listingData.tags.map((tag:string, index:number) => {
                                                        return (
                                                            <Tag key={index} colorScheme="teal" color="black" size="sm" px="4">{tag}</Tag>
                                                        )
                                                    })
                                                }
                                            </Flex>
                                        </Flex>
                                        <Flex gap="4">
                                            <Flex gap="1" as={Button} bg="green.500" color="white" onClick={()=>serviceVote("up")}>
                                                <ArrowUpIcon size={20} extraStyles={{color:"white"}}/>
                                                <span>{listingData.upvotes}</span>
                                            </Flex>
                                            <Flex gap="1" as={Button} bg="red.500" color="white" onClick={()=>serviceVote("down")}>
                                                <ArrowDownIcon size={20} extraStyles={{color:"white"}}/>
                                                <span>{listingData.downvotes}</span>
                                            </Flex>
                                            {/* <Flex gap="1">
                                                <MessageIcon size={20} extraStyles={{color:"white"}}/>
                                                <span>{listingData.comments}</span>
                                            </Flex> */}
                                        </Flex>
                                        <p>{listingData.description}</p>
                                        <Flex gap="8" alignItems="center">
                                            <Text>
                                                {`Price: ${listingData.price}€`}
                                            </Text>
                                            <Button onClick={() => buyService()}>
                                                Purchase
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Stack>
                                <Stack direction="column" spacing="8" p="8">
                                    <Heading as="h3" size="lg">Comments {`(${listingData.comment_counter})`}</Heading>
                                    <Flex gap={1}>
                                        <Input placeholder="Comment" type="text" onChange={(e:Event)=>setInputComment(e.target.value)}/>
                                        <Button onClick={()=>manageComment()}>
                                            Post
                                        </Button>
                                    </Flex>
                                    {
                                        comments.map((comment, index) => {
                                            return (
                                                <Box key={index} p={5} shadow='md' borderWidth='1px' w="50%">
                                                    <Flex direction="row" gap="4">
                                                        <UserIcon size={20} extraStyles={{color:"white"}}/>
                                                        <Heading size="md">{`${comment.user_address.substring(0,4)}...${comment.user_address.substring(comment.user_address.length-4, comment.user_address.length)}`}</Heading>
                                                    </Flex>
                                                    <Text>{comment.comment}</Text>
                                                    <Flex gap="4" mt="4">
                                                        <Flex gap="1" onClick={()=>commentVote(comment.item_hash, "up")}>
                                                            <ArrowUpIcon size={20} extraStyles={{color:"white"}}/>
                                                            <span>{comment.upvotes}</span>
                                                        </Flex>
                                                        <Flex gap="1" onClick={()=>commentVote(comment.item_hash, "down")}>
                                                            <ArrowDownIcon size={20} extraStyles={{color:"white"}}/>
                                                            <span>{comment.downvotes}</span>
                                                        </Flex>
                                                    </Flex>
                                                </Box>
                                            )
                                        })
                                    }
                                </Stack>
                            </Box>
                        ) : (
                            <div>
                                <h1>Listing not found</h1>
                            </div>
                        )   
                    }
                </div>
            </Flex>
        </>
    );
}
