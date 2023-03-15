import * as React from "react"
import {
  etherscanLink,
  useActiveAuction,
  useDaoToken,
  useNounsProtocol,
} from "@public-assembly/dao-utils"
import { ethers } from "ethers"
import { shortenAddress } from "utils/shortenAddress"
import { useEnsName } from "wagmi"
export type AuctionEvent = {
  id: number
  bidder: string
  amount: string
  transactionHash: string
}

export const useBid = ({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: `0x${string}`
  tokenId: string
}) => {
  const { auctionData } = useActiveAuction(tokenAddress)

  const { tokenData } = useDaoToken({
    tokenAddress: tokenAddress,
    tokenId: tokenId,
  })

  const { auctionContract } = useNounsProtocol({
    tokenAddress: tokenAddress,
    auctionAddress: auctionData?.address,
  })

  const [winningBid, setWinningBid] = React.useState<string | undefined>("N/A")
  const [winningTx, setWinningTx] = React.useState<string | undefined>()
  const [address, setAddress] = React.useState<string | undefined>()
  const [auctionEvents, setAuctionEvents] = React.useState<AuctionEvent[]>()

  const { data: ensName } = useEnsName({
    address: address as `0x${string}` | undefined,
  })

  const bidder = React.useMemo(
    () => (ensName ? ensName : shortenAddress(address)),
    [ensName, address]
  )

  React.useEffect(() => {
    async function getBids() {
      try {
        if (tokenData?.mintInfo?.mintContext?.blockNumber) {
          /**
           * https://docs.ethers.io/v5/api/contract/contract/#Contract-queryFilter
           * Used to query the Auction events exposed below:
           * https://github.com/ourzora/nouns-protocol/blob/main/src/auction/IAuction.sol#L16-L22
           */
          const bids = await auctionContract?.queryFilter(
            "AuctionBid" as any,
            tokenData?.mintInfo?.mintContext?.blockNumber,
            "latest" /* Clamp at next token block number if decrementing */
          )
          if (bids) {
            const auctionEventsArray = bids.map((event: any) => {
              return {
                id: parseInt(event.args?.tokenId?._hex, 16),
                bidder: event.args?.bidder as string,
                amount: ethers.utils.formatEther(event.args?.amount),
                transactionHash: event.transactionHash as string,
              }
            }) as AuctionEvent[]

            setAuctionEvents(auctionEventsArray)

            const tokenEvents = auctionEventsArray?.filter(
              (token) => token?.id === Number(tokenId)
            )

            if (tokenEvents?.length) {
              const lastTokenEvent = tokenEvents.at(-1)
              setAddress(lastTokenEvent?.bidder)
              setWinningBid(`${lastTokenEvent?.amount}`)
              setWinningTx(
                etherscanLink({ hash: lastTokenEvent?.transactionHash })
              )
            } else {
              setWinningBid("N/A")
              setWinningTx(undefined)
            }
          }
        }
      } catch (err) {}
    }
    getBids()

    return function cleanup() {}
  }, [auctionContract, tokenId, tokenData])
  return { winningBid, winningTx, address, auctionEvents }
}
