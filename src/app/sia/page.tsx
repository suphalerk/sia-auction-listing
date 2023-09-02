"use client"
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { ThaiFormatDate } from '../../../utils/date';

export default async function Home() {
  const roundResult = await getRound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          SIA Auction Listing
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          By [L]ove[O]n|y
        </div>
      </div>
      {roundResult?.data?.data?.auctionRounds?.length > 0 && <Round auctionRound={roundResult?.data?.data?.auctionRounds}></Round>}


      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://home.sia.co.th/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            SIA Auction Website{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>

          </p>
        </a>


      </div>
    </main>
  )
}

const Round = (props: { auctionRound: any[] }) => {
  const auctionRounds = props?.auctionRound
  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
      {auctionRounds.map((round: any, index: number) => {
        return <RoundLinkBadge roundNumber={round.roundNumber} auctionDate={round.auctionDate} key={index} />
      })}
    </div>
  )
}

const RoundLinkBadge = (props: { roundNumber: number, key: number, auctionDate: any }) => {
  const auctionDateTime = new Date(props.auctionDate)
  const displayDate = ThaiFormatDate(auctionDateTime)
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_VERCEL_URL}/sia/round/${props.roundNumber.toString()}`}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        รอบประมูลที่ {props.roundNumber.toString()}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        วันที่ประมูล {displayDate && displayDate}
      </p>
    </Link>
  )
}

const getRound = async () => {
  const basePath = process.env.NEXT_PUBLIC_VERCEL_URL
  const roundListingUrl = `${basePath}/api/sia/lists/round`;

  try {
    const response = await axios.get(roundListingUrl);
    return {
      data: response.data
    }
  } catch (error: any) {
    console.log(JSON.stringify(error))
    error.response && console.log(error.response);
    return {
      error: JSON.stringify(error)
    }
  }
}
