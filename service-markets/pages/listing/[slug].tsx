import Head from 'next/head'
import styles from '@/styles/ListingPage.module.css'
import { Box, Text, Button, Flex, Heading, Stack, useToast } from '@chakra-ui/react'
import '@fontsource/fira-mono'
import '@fontsource/oxygen-mono'
import localFont from 'next/font/local'
import { UserIcon, ArrowUpIcon, ArrowDownIcon, MessageIcon } from '@/icons'
import { useRouter } from "next/router";
import { mockListings, mockComments } from "@/utils";
import { useEffect, useState } from "react";

export default function Listing() {
    const router = useRouter();
    const { slug } = router.query;
    const [listingData, setListingData] = useState({} as any);
    const toast = useToast();

    useEffect(() => {
        mockListings.forEach(element => {
            if (element.name === slug) {
                setListingData(element);
            }
        });
    }, [slug]);

    const buyService = () => {
        toast({
            title: "Service Purchased",
            description: "You have successfully purchased this service",
            status: "success",
            duration: 9000,
            isClosable: true,
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
                                 <Stack direction="row" spacing="8">
                                    <img src={listingData.image} alt={listingData.name} width={700}/>
                                    <Flex direction="column" gap="4">
                                        <Heading as="h3" size="xl">{listingData.name}</Heading>
                                        <Flex gap="4">
                                            <Flex gap="1">
                                                <ArrowUpIcon size={20} extraStyles={{color:"white"}}/>
                                                <span>{listingData.upvotes}</span>
                                            </Flex>
                                            <Flex gap="1">
                                                <ArrowDownIcon size={20} extraStyles={{color:"white"}}/>
                                                <span>{listingData.downvotes}</span>
                                            </Flex>
                                            <Flex gap="1">
                                                <MessageIcon size={20} extraStyles={{color:"white"}}/>
                                                <span>{listingData.comments}</span>
                                            </Flex>
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
                                    <Heading as="h3" size="lg">Comments</Heading>
                                    {
                                        mockComments.map((comment, index) => {
                                            return (
                                                <Box key={index} p={5} shadow='md' borderWidth='1px' w="50%">
                                                    <Flex direction="row" gap="4">
                                                        <UserIcon size={20} extraStyles={{color:"white"}}/>
                                                        <Heading size="md">{comment.author}</Heading>
                                                    </Flex>
                                                    <Text>{comment.comment}</Text>
                                                    <Flex gap="4" mt="4">
                                                        <Flex gap="1">
                                                            <ArrowUpIcon size={20} extraStyles={{color:"white"}}/>
                                                            <span>{comment.upvotes}</span>
                                                        </Flex>
                                                        <Flex gap="1">
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
