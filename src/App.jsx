import { useStacksAuth } from './hooks/useStacksAuth'
import ConnectWallet from './components/ConnectWallet'
import Counter from './components/Counter'
import UserInfo from './components/UserInfo'
import { Toaster } from './components/ui/toaster'

const App = () => {
  const { userData, isAuthenticated, signOut } = useStacksAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Clarity Counter dApp</h1>
          {isAuthenticated && (
            <button
              onClick={signOut}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Sign Out
            </button>
          )}
        </header>

        <main>
          {!isAuthenticated ? (
            <ConnectWallet />
          ) : (
            <>
              <UserInfo 
                userAddress={userData.profile.stxAddress.mainnet} 
              />
              <Counter 
                userAddress={userData.profile.stxAddress.mainnet}
              />
            </>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default App