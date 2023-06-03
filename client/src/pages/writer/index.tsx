import WritersBlock from '@/components/WritersBlock'
import WithAuth from '@/context/WithAuth'

const index = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <WritersBlock />
      </div>
    </>
  )
}

export default WithAuth(index)
