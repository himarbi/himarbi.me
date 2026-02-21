import React from "react";
import { Avatar, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "HELLO, I AM IBRAHIM ABUKAR AHMED";
const bio1 = "AKA HIMARBI";
const bio2 = "WEB DEVELOPER";

const LandingSection = () => (
    <FullScreenSection
        justifyContent="center"
        alignItems="center"
        isDarkBackground={false}
        backgroundColor="#f0f8ff"
        bgGradient="linear(to-b, #e0f2fe, #bae6fd, white)"
        color="gray.800"
    >
        <VStack spacing={8} textAlign="center" px={4}>
            <Avatar
                src="https://i.pravatar.cc/150?img=11"
                size="2xl"
                name="Ibrahim Abukar Ahmed"
                boxShadow="xl"
            />
            <VStack spacing={2}>
                <Text fontWeight="bold" color="blue.600" letterSpacing="widest" fontSize="sm">
                    {greeting}
                </Text>
                <Heading as="h1" size="4xl" fontWeight="black" noOfLines={1} textTransform="uppercase">
                    {bio1}
                </Heading>
                <Heading as="h2" size="2xl" fontWeight="extrabold" color="gray.700" noOfLines={1} textTransform="uppercase">
                    {bio2}
                </Heading>
            </VStack>
        </VStack>
    </FullScreenSection>
);

export default LandingSection;
