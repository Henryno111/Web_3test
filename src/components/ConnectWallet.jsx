import { Connect } from '@stacks/connect-react'

const ConnectWallet = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
      <Connect className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" />
    </div>
  )
}

export default ConnectWallet;