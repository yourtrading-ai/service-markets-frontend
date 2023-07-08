import styles from './styles/Listing.module.css'
import { MessageIcon, ArrowUpIcon, ArrowDownIcon, ArrowRightIcon } from '@/icons'
import { Flex, Heading, Button, Image, Spacer, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getRandomColorScheme, getMethod } from '@/utils'

export default function Listing({name, owner_address, description, upvotes, downvotes, comment_counter, image, tags}:any) {
    const router = useRouter();

    return (
        <div className={styles.main}>
            <div className={styles.listingImage}>
                <Image src={image ?? "./skeletonImage.jpg"} alt={name} objectFit="contain" w="100%" transform="scale(2)"/>
            </div>
            <div className={styles.listingCardBody}>
                <Heading as="h3" size="lg">{name}</Heading>
                <p>{`By: ${owner_address.substring(0,4)}...${owner_address.substring(owner_address.length-4, owner_address.length)}`}</p>
                <p className={styles.description}>{description}</p>
                <Flex wrap="wrap" gap="2">
                    {
                        tags.map((tag:any, index:number) => {
                            return (
                                <Tag key={index} colorScheme={getRandomColorScheme()} color="black" size="sm" mr="2">{tag}</Tag>
                            )
                        })
                    }
                </Flex>
                <Spacer />
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
                            <span>{comment_counter}</span>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Button bg="black" color="white" onClick={() => router.push(`/listing/${name}`)} display="flex" alignItems="center" justifyContent="center" gap="0.5    rem">
                            View
                            <ArrowRightIcon size={15}/>
                        </Button>
                    </Flex>
                </div>
            </div>
        </div>
    )
}