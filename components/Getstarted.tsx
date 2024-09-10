import React from 'react'
import Image from 'next/image'

function Getstarted() {
  return (
    <div>
        <div className="w-full h-[469px] p-[20px] pt-0 gap-[12px] rounded-[12px] bg-[#FAFAFA] flex flex-col items-center justify-center">
                  <Image
                    src="./Group.svg"
                    alt=""
                    width={249.53}
                    height={160}
                  />

                  <p className="font-instrument-sans  text-[32px] font-bold leading-[48px] text-center text-[#333333]">
                    Let’s get you started
                  </p>
                  <p className="font-instrument-sans  text-[16px] font-normal leading-[24px] text-center text-[#737373] max-w-[488px]">
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
                  </p>
                </div>
    </div>
  )
}

export default Getstarted
