import { useAccount, useConnect } from "wagmi"
import { useEffect, useState } from "react"
import { Flex, Box, Grid, GridItem, Card, CardHeader, CardBody, CardFooter, Button, ButtonGroup, Divider, Heading, Stack, Image, Text } from "@chakra-ui/react"
import { getMethod } from "@/utils"
import '@fontsource/fira-mono'
import '@fontsource/oxygen-mono'

export default function Dashboard() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const [listings, setListings] = useState([] as any[])

    useEffect(() => {
        connect()
    }, [isConnected, address])

    useEffect(() => {
        if (isConnected) {
            getMethod.allListings().then((res) => {
                res.forEach((listing: { owner_address: string | undefined }) => {
                    if (listing.owner_address === address) {
                        setListings([...listings, listing])
                    }
                })
            })
        }
    }, [isConnected, address])

    return (
        <Box px="4">
            {
                isConnected ? (
                    <Flex direction="column" gap={4}>
                        <h1>Dashboard</h1>
                        <p>Account: {address}</p>
                        <Grid templateColumns="repeat(3, 1fr)">
                            <GridItem>
                                <h2>My Listings</h2>
                                <Box>
                                    {listings.map((listing, index) => {
                                        return (
                                            <Card maxW='sm' my={4} key={listing.item_hash}>
                                                <CardBody>
                                                    <Stack mt='2' spacing='3'>
                                                        <Heading size='md'>{listing.name}</Heading>
                                                        <Text>
                                                            {listing.description}
                                                        </Text>
                                                        <Text color='green.600' fontSize='2xl'>
                                                            {listing.price} €
                                                        </Text>
                                                    </Stack>
                                                </CardBody>
                                            </Card>
                                    )})}         
                                </Box>
                            </GridItem>
                            <GridItem>
                                <h2>My Purchases</h2>
                            </GridItem>
                            <GridItem>
                                <h2>My Sales</h2>
                            </GridItem>
                        </Grid>
                    </Flex>
                ) : (
                    <div>
                        <h1>Please connect your wallet to use the dashboard</h1>
                    </div>
                )
            }
        </Box>
    )
}