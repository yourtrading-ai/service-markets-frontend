import Head from 'next/head'
import styles from '@/styles/ListingPage.module.css'
import { Box, Text, Button, Flex, Heading, Stack, FormControl, FormLabel, Input, InputRightAddon, InputGroup, Tag } from '@chakra-ui/react'
import '@fontsource/fira-mono'
import '@fontsource/oxygen-mono'
import { useEffect, useState } from 'react'

export default function Home() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        url: "",
        tags: [],
        price: 0
    })
    const [tags, setTags] = useState([] as string[]);
    const [image, setImage] = useState("" as string);

    const manageTags = (e:Event) => {
        if (e.key === "Enter" || e.key === " ") {
            setTags([...tags, e.target.value]);
            e.target.value = "";
        }
    }

    const manageImage = (e:Event) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        console.log(image);
    }, [image])

    useEffect(() => {
        setFormData({...formData, tags:tags});
    }, [tags])

    const submitForm = () => {
        console.log(formData);
    }

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
                    Create a Listing
                </Heading>

                <Stack w="50%">
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" onChange={(e:Event) => setFormData({...formData, name:e.target?.value})}/>
                    </FormControl>

                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Input type="text" onChange={(e:Event) => setFormData({...formData, description:e.target?.value})}/>
                    </FormControl>

                    <FormControl id="image">
                        <FormLabel>Image</FormLabel>
                        {
                            image ? (
                                <Box my={2}>
                                    <img src={image} alt="Listing Image" className={styles.imagePreview}/>
                                </Box>
                            ) : (
                                null
                            )
                        }
                        <div>
                            <label htmlFor="image_uploads" className={styles.imageUploadButton}>
                                <Text>Choose File</Text>
                            </label>
                            <input style={{display:"none"}} id="image_uploads" type="file" accept="image/png, image/jpeg" onChange={(e:Event) => manageImage(e)}/>
                        </div>
                    </FormControl>

                    <FormControl id="url" isRequired>
                        <FormLabel>API URL</FormLabel>
                        <Input type="text" onChange={(e:Event) => setFormData({...formData, url:e.target?.value})}/>
                    </FormControl>

                    <FormControl id="tags">
                        <FormLabel>Tags</FormLabel>
                        <Flex border='1px solid #E0E1E7' alignItems='center' wrap='wrap' borderRadius='md'>
                            {tags.map((tag, index) => {
                                return (
                                    <Tag key={index} size='lg' m={2} colorScheme="teal">
                                        {tag}
                                    </Tag>
                                )
                            })}
                            <Input type="text" border='none' placeholder='Type or select a skill from the list' _focusVisible={{border: '1px solid transparent'}} onKeyDown={(e:Event)=> manageTags(e)}/>
                        </Flex>
                    </FormControl>

                    <FormControl id="price" isRequired>
                        <FormLabel>Price</FormLabel>
                        <InputGroup>
                            <Input type="number" onChange={(e:Event) => setFormData({...formData, price:e.target?.value})}/>
                            <InputRightAddon>
                                <Text color="black">€</Text>
                            </InputRightAddon>
                        </InputGroup>
                    </FormControl>

                    <Button bgGradient="linear(to-br, #59FF91, #339797)" onClick={() => submitForm()}>
                        <Text>Create</Text>
                    </Button>
                </Stack>
            </Flex>
        </>
    )
}
