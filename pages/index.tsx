import React from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  CircularProgress,
  Image,
  Switch,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useTheme } from "../contexts/ThemeContext";
import useSwr from "swr";
import axios from "axios";
import ManaSymbol from "../components/ManaSymbol";
import CardDrawer from "../components/Drawer";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fetcher = (url: string) => axios.get(url);

  const response = await fetcher("https://api.magicthegathering.io/v1/cards");

  const success = response?.status === 200;

  return {
    props: {
      data: success ? response?.data : {},
    },
  };
};

type Props = {
  data: {
    cards: Array<Record<string, any>>;
  };
};

const getRandomItem = (arr: Array<string>) =>
  arr[Math.floor(Math.random() * arr.length)];

export default function Home({ data }: Props) {
  const fetcher = (url: string) => axios.get(url);

  const cards = data?.cards;

  const cardIds = cards.map((card: Record<string, any>) => card.id);

  const [currId, setCurrId] = React.useState(cardIds[0]);

  const { data: cardData, error } = useSwr(
    `https://api.magicthegathering.io/v1/cards/${currId}`,
    fetcher
  );

  const card = cardData?.data.card;

  const symbolArr = card?.manaCost
    .split("}")
    .join("")
    .split("{")
    .filter((i: string) => Boolean(i))
    .map((i: string) => i.toLowerCase());

  const [theme, toggleTheme] = useTheme();


  return (
    <Box h="100vh" w="100%" bg={theme.bg[0]}>
      <Box
        maxW={{ base: "90%", md: "80%", lg: "1200px" }}
        h="80vh"
        pt="40px"
        mx="auto"
      >
        <Flex minH="60px" justify="flex-end">
          <Text mr={4}>Change Theme</Text>
          <Switch id="theme" onChange={toggleTheme} />
        </Flex>
        <Flex
          minW="100%"
          bg={theme.bg[1]}
          h="100%"
          flexDir={{ base: "column", lg: "row" }}
          align={{ base: "center", lg: "initial" }}
          overflowY={{ base: "scroll", lg: "hidden" }}
        >
          <Flex
            justify="center"
            align="center"
            minW={{ base: "54%", lg: "420px" }}
            my={{ base: "20px", lg: "initial" }}
            minH={{ base: "450px", lg: "350px" }}
            d={{ base: "none", md: "flex" }}
            p={4}
            textColor="#fff"
          >
            {!cardData ? (
              <CircularProgress isIndeterminate color="black" />
            ) : (
              <Image src={card.imageUrl} alt="Card Image" minW="340px" />
            )}
          </Flex>
          {!cardData ? (
            <Flex justify="center" align="center" w="65%">
              <CircularProgress isIndeterminate color="black" />
            </Flex>
          ) : (
            <Flex
              flexDir="column"
              minH="100%"
              minW={{ base: "100%", lg: "65%" }}
              overflowY={{ base: "hidden", lg: "scroll" }}
              bg={theme.bg[2]}
              color={theme.color[0]}
            >
              <Flex
                minH="120px"
                borderBottom="1px solid #1f1f1f"
                justify="space-around"
                align="center"
                fontSize="25px"
                fontWeight="bold"
              >
                <Text>{card.name}</Text>
                <Text>
                  {symbolArr.map((sym: string, i: number) => (
                    <ManaSymbol mod={sym} key={i} />
                  ))}
                </Text>
              </Flex>
              <Flex d={{ base: "block", md: "none" }} mx="auto">
                <CardDrawer>
                  <Image src={card.imageUrl} alt="Card Image" minW="80%" />
                </CardDrawer>
              </Flex>
              <Flex minH="120px" justify="space-around" align="center">
                <Text fontSize="22px">{card.type}</Text>
              </Flex>
              <Flex
                minH="120px"
                maxW="90%"
                mx="auto"
                flexDir="column"
                justify="space-around"
              >
                <Text>{card.text}</Text>
              </Flex>
              <Flex
                minH="120px"
                maxW="90%"
                mx="auto"
                flexDir="column"
                justify="space-around"
              >
                <Text fontSize="18px" justifySelf="center">
                  {(card.power || card.toughness) &&
                    `${card.power} / ${card.toughness}`}
                </Text>
              </Flex>
              <Flex
                minH="200px"
                maxW="90%"
                mx="auto"
                flexDir="column"
                fontSize="20px"
              >
                <Box>
                  {" "}
                  <Text>Illustrated By: {card.artist}</Text>
                </Box>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Flex justify="center" mt={12}>
          <Button onClick={() => setCurrId(getRandomItem(cardIds))}>
            Show Random Card
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
