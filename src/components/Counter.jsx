import { useState, useEffect } from 'react'
import { openContractCall } from '@stacks/connect'
import { callReadOnlyFunction } from '@stacks/transactions'
import { useToast } from './ui/use-toast'

const Counter = ({ userAddress }) => {
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS
  const CONTRACT_NAME = 'counter'

  useEffect(() => {
    if (userAddress) {
      fetchCounter()
    }
  }, [userAddress])

  const fetchCounter = async () => {
    try {
      const result = await callReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-counter',
        network: 'mainnet',
      })
      setCounter(result.value.value)
    } catch (error) {
      toast({
        title: "Error fetching counter",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const handleCounterOperation = async (operation) => {
    setLoading(true)
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: operation,
        functionArgs: [],
        onFinish: (data) => {
          toast({
            title: "Transaction submitted",
            description: `${operation} operation successful!`
          })
          fetchCounter()
        },
        onCancel: () => {
          toast({
            title: "Transaction cancelled",
            description: "Operation was cancelled by user",
            variant: "destructive"
          })
        }
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Counter</h2>
        <p className="text-4xl font-mono">{counter}</p>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={() => handleCounterOperation('increment')}
          disabled={loading}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          + Increment
        </button>
        <button
          onClick={() => handleCounterOperation('decrement')}
          disabled={loading}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          - Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter