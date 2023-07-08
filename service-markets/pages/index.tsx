import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Box, Text, Button, Flex, Spacer, Grid, GridItem, Heading, Container } from '@chakra-ui/react'
import '@fontsource/fira-mono'
import '@fontsource/oxygen-mono'
import { Listing } from '@/components'
import { mockListings } from '@/utils'
import { useRouter } from 'next/router'

const Listings = mockListings

export default function Home() {
  const router = useRouter()

  return (
    <>
        <Head>
          <title>Service.Markets</title>
          <meta name="description" content="A Marketplace for all your service needs" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Flex className={styles.pageBody}>
          <Grid templateColumns="80% 20%" w="100%" h="5rem">
            <GridItem w="100%">
              
            </GridItem>
            <GridItem w="100%" display="flex" alignItems="center">
              <Button font="subtitle" fontSize="30" py="7" fontWeight="900" bgGradient="linear(to-r, #76DB98, #339797)" onClick={() => router.push("/createListing")}>
                <Text>Add Service</Text>
              </Button>
            </GridItem>
          </Grid>

          <Container maxW="100%">
            <Box borderBottom="2px solid white" w="25%">
              <Heading as="h4">Services</Heading>
            </Box>
            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}} templateRows="repeat(2, 1fr)" my="6" gap="10">
              {Listings.map((listing, index) => {
                  return (
                    <GridItem key={index}>
                      <Listing {...listing}/>
                    </GridItem>
                  )
                }
              )}
            </Grid>
          </Container>
        </Flex>
    </>
  )
}
