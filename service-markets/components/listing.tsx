import styles from './styles/Listing.module.css'
import { MessageIcon, ArrowUpIcon, ArrowDownIcon } from '@/icons'
import { Flex, Heading, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Listing({name, author, description, price, upvotes, downvotes, comments, image}:any) {
    const router = useRouter();

    return (
        <div className={styles.main}>
            <div className={styles.listingImage}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.listingCardBody}>
                <Heading as="h3" size="lg">{name}</Heading>
                <p>{`By: ${author}`}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.listingFooter}>
                    <Flex gap="4">
                        <Flex>
                            <ArrowUpIcon size={20} />
                            <span>{upvotes}</span>
                        </Flex>
                        <Flex>
                            <ArrowDownIcon size={20} />
                            <span>{downvotes}</span>
                        </Flex>
                        <Flex>
                            <MessageIcon size={20} />
                            <span>{comments}</span>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Button bgGradient="linear(to-br, #59FF91, #339797)" onClick={() => router.push(`/listing/${name}`)}>
                            Try
                        </Button>
                    </Flex>
                </div>
            </div>
        </div>
    )
}