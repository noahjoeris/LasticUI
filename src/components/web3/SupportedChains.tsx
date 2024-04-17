import { env } from '@/config/environment'
import { SubstrateChain, getSubstrateChain, useInkathon } from '@poppyseed/lastic-sdk'
import Cookies from 'js-cookie'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FiChevronDown } from 'react-icons/fi'

const SupportedChains: FC = () => {
  const { activeChain, switchActiveChain } = useInkathon()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [supportedChains] = useState(
    env.supportedChains.map((chainMap) => ({
      coretime: getSubstrateChain(chainMap.coretime) as SubstrateChain,
      relay: getSubstrateChain(chainMap.relay) as SubstrateChain,
    })),
  )

  useEffect(() => {
    const storedNetwork = Cookies.get('activeNetwork')
    if (storedNetwork && activeChain?.network !== storedNetwork) {
      const chainToSwitch = supportedChains.find(
        (chain) =>
          chain.coretime.network === storedNetwork || chain.relay.network === storedNetwork,
      )
      if (chainToSwitch) {
        switchActiveChain?.(chainToSwitch.coretime, chainToSwitch.relay)
      }
    }
  }, [activeChain, supportedChains, switchActiveChain])

  // const handleChainSwitch = async (chain: SubstrateChain, relayChain: SubstrateChain) => {
  //   if (chain.network !== activeChain?.network) {
  //     await switchActiveChain?.(chain, relayChain)
  //     toast.success(`Switched to ${chain.name}`)
  //     setIsDropdownOpen(false) // Close dropdown after switching
  //   }
  // }

  const handleChainSwitch = async (chain: SubstrateChain, relayChain: SubstrateChain) => {
    if (chain.network !== activeChain?.network) {
      await switchActiveChain?.(chain, relayChain)
      toast.success(`Switched to ${chain.name}`)
      Cookies.set('activeNetwork', chain.network, { expires: 7 }) // Store the active network in cookies for 7 days
      setIsDropdownOpen(false) // Close dropdown after switching
    }
  }

  return (
    <div className="relative flex flex-row">
      <div
        className="flex flex-row justify-between space-x-3 items-center p-2 cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <p>Network: {activeChain?.name}</p>
        <FiChevronDown size={16} className={`${isDropdownOpen ? 'transform rotate-180' : ''}`} />
      </div>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full border-t-2 border-gray-3">
          {supportedChains.map((chainPair, index) => {
            const { coretime, relay } = chainPair
            return (
              coretime.network !== activeChain?.network && (
                <div
                  key={index}
                  onClick={() => handleChainSwitch(coretime, relay)}
                  className="p-2 flex justify-between items-center cursor-pointer"
                >
                  <p>{coretime.name}</p>
                </div>
              )
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SupportedChains
