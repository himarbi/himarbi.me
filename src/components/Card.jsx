import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
    return (
        <VStack
            color="black"
            backgroundColor="white"
            borderRadius="xl"
            cursor="pointer"
            alignItems="flex-start"
        >
            <Image src={imageSrc} borderRadius="xl" alt={title} />
            <VStack spacing={4} p={4} alignItems="flex-start">
                <Heading as="h3" size="md">
                    {title}
                </Heading>
                <Text color="#64748b" fontSize="lg">
                    {description}
                </Text>
                <HStack spacing={2} fontWeight="bold">
                    <p>See more</p>
                    <FontAwesomeIcon icon={faArrowRight} size="1x" />
                </HStack>
            </VStack>
        </VStack>
    );
};

export default Card;
