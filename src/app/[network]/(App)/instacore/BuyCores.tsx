'use client'
import Border from '@/components/border/Border'
import PurchaseCreditsModal from '@/components/broker/extrinsics/PurchaseCreditsModal'
import SecondaryButton from '@/components/button/SecondaryButton'
import WalletStatus from '@/components/walletStatus/WalletStatus'
import { useInkathon } from '@poppyseed/lastic-sdk'

import React from 'react'

const BuyCores: React.FC = () => {
  const { activeAccount, activeChain } = useInkathon()
  const [creditsModalOpen, setCreditsModalOpen] = React.useState<boolean>(false)

  if (!activeAccount || !activeChain) {
    return (
      <Border className="h-full flex flex-row justify-center items-center">
        <WalletStatus />
      </Border>
    )
  }

  return (
    <Border className="h-full flex justify-center items-center">
      <div className="flex flex-col columns-1 items-center">
        <SecondaryButton
          title="Purchase Credits"
          onClick={() => setCreditsModalOpen(true)}
          className="px-14 mb-8 "
        />
      </div>

      <PurchaseCreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
    </Border>
  )
}

export default BuyCores
