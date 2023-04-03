// React
import React, { useState, useEffect } from "react"
// Utils
import { cn } from "utils/cn"
import { ENV } from "utils/env"
// Icons
import { ArrowLeft, ArrowRight } from "@/components/assets/icons"
import { Pending } from "@/components/assets/icons"
// Components
import { AuctionSheet } from "@/components/auction/AuctionSheet"
// Layout & Typography
import Button from "@/components/base/Button"
import { Flex } from "@/components/base/Flex"
import { Stack } from "@/components/base/Stack"
import { BlurImage } from "@/components/BlurImage"
import Label from "../base/Label"
// dao-utils
import { useDaoToken, useBid } from "@public-assembly/dao-utils"
// Hooks
import { useIsMobile } from "@/hooks/useIsMobile"
import { useAuction } from "@/hooks/useAuction"
import { useAuth } from "@/hooks/useAuth"
// Misc
import { motion } from "framer-motion"
import { getUnixTime } from "date-fns"
import { ethers, BigNumber } from "ethers"

const Auction = () => {
  const { isMobile } = useIsMobile()
  const { provider } = useAuth()
  const {
    auctionData,
    totalSupply,
    incrementId,
    decrementId,
    tokenId,
    isFirstToken,
    isLastToken,
    thumbnail,
    tokenName,
  } = useAuction()

  const { winningBid, winningTx } = useBid({
    tokenId,
    tokenAddress: ENV.TOKEN_ADDRESS,
  })

  const [auctionEnded, setAuctionEnded] = useState<boolean>(false)
  const [tokenBlock, setTokenBlock] = useState<number>()

  const { tokenData } = useDaoToken({
    tokenAddress: ENV.TOKEN_ADDRESS,
    tokenId: tokenId,
  })

  const tokenTitle = tokenData?.metadata?.name

  useEffect(() => {
    async function getTokenBlock() {
      const unixBlock = await provider.getBlock(
        tokenData?.mintInfo.mintContext.blockNumber
      )
      setTokenBlock(Number(unixBlock?.timestamp))
    }
    getTokenBlock()
  }, [tokenData])

  useEffect(() => {
    if (auctionData.tokenId == tokenId) {
      // If the current tokenId matches the passed tokenId, and the current time is greater than tokenBlock + 24 hours,
      // set auctionEnded to true
      if (tokenBlock && getUnixTime(Date.now()) >= tokenBlock + 86400) {
        setAuctionEnded(true)
      } else {
        // If the current tokenId matches the passed tokenId, and the current time is NOT greater than tokenBlock + 24 hours,
        // set auctionEnded to false
        setAuctionEnded(false)
      }
    } else {
      // If the current tokenId doesn't match the passed tokenId, and the current time is greater than tokenBlock,
      // set auctionEnded to true
      if (tokenBlock && getUnixTime(Date.now()) >= tokenBlock) {
        setAuctionEnded(true)
      }
    }
  }, [auctionData, tokenId, tokenBlock])

  if (!totalSupply) return null
  return (
    <Stack className="h-full gap-4 px-4 pt-20 overflow-x-hidden ">
      <Flex className="relative justify-center w-full">
        <Stack className="relative justify-between max-h-[690px] max-w-[690px] w-full h-full p-4 aspect-square">
          <div className="absolute inset-0 z-0 w-full aspect-square">
            {thumbnail && (
              <BlurImage
                src={thumbnail}
                height={690}
                width={690}
                alt={`${tokenId}`}
              />
            )}
          </div>

          {/* Explorer buttons */}
          <Flex className="gap-4">
            <Button
              variant="tertiary"
              onClick={decrementId}
              className={cn(
                "w-fit z-10 custom-shadow",
                isFirstToken && "pointer-events-none opacity-20"
              )}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="tertiary"
              onClick={incrementId}
              className={cn(
                "w-fit z-10 custom-shadow",
                isLastToken && "pointer-events-none opacity-20"
              )}
            >
              <ArrowRight />
            </Button>
          </Flex>
          {isMobile ? null : (
            <Flex className="justify-between">
              {/* Current token/Historical token badge */}
              <div className="z-10 px-4 py-2 bg-primary text-secondary rounded-object body">
                <span>{tokenName}</span>
              </div>
              {/* Current bid/Winning bid badge */}
              <Label variant="row" className="z-10 ">
                <a className="flex" href={winningTx}>
                  <span className="mr-4">
                    {!auctionEnded ? "Current bid" : "Winning bid"}
                  </span>
                  {`${winningBid} ETH`}
                </a>
              </Label>
            </Flex>
          )}
        </Stack>

        {/* Desktop/Tablet Auction button */}
        <AuctionSheet
          tokenId={tokenId}
          tokenTitle={tokenTitle}
          tokenBlock={tokenBlock}
          winningBid={winningBid}
          auctionEnded={auctionEnded}
        />
      </Flex>

      {/* Mobile auction button */}
      {isMobile ? (
        <Stack className="justify-between flex-grow w-full h-full">
          <Stack className="gap-2">
            {/* Current token/Historical token badge */}
            <motion.div className="px-4 py-2 bg-primary text-secondary rounded-object w-fit">
              {tokenName}
            </motion.div>
            {/* Current bid/Winning bid badge */}
            <Label variant="row" className="z-10 ">
              <a className="flex" href={winningTx}>
                <span className="mr-4">
                  {!auctionEnded ? "Current bid" : "Winning bid"}
                </span>
                {`${winningBid} ETH`}
              </a>
            </Label>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  )
}

export default Auction
