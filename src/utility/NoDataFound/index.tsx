import ImageComponent from '@/components/Image'
import Link from 'next/link'
import React from 'react'

export default function NoDataFound() {
  return (
    <>
      <div className=" px-5 lg:px-20  py-32 col-span-full grid place-items-center nodata">
        <div className="flex flex-col items-center max-w-[408px] ">
          <ImageComponent
            src={"/img/nodatafilter.svg"}
            alt={"nodata"}
            height={100}
            width={116}
            className={''}
          />
          <h1 className=" text-2xl leading-6 font-medium text-black   mt-6 text-center dark:dark:text-light-1">
            No Listing Yet !
          </h1>
          <Link href='/' className='h-[3rem] grid place-items-center bg-black text-base text-white  px-5 mt-4 rounded-md dark:bg-white dark:text-black'>Go to Home Page</Link>
          </div>
      </div>
    </>
  )
}
