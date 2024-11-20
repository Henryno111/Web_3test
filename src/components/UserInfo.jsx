const UserInfo = ({ userAddress }) => {
  return (
    <div className="text-center mb-6">
      <h3 className="text-lg font-medium mb-2">Connected Wallet</h3>
      <p className="font-mono bg-gray-100 p-2 rounded">
        {userAddress}
      </p>
    </div>
  )
}

export default UserInfo
