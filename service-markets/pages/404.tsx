import { Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Fourohfour() {
    return (
        <>
            <Head>
                <title>Service.Markets</title>
                <meta name="description" content="A Marketplace for all your service needs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Heading>
                    404
                </Heading>
                <Text>
                    Page not found
                </Text>
            </Flex>
        </>
    )
}