import Box from '../components/Box'
import Dustbin from '../components/Dustbin'

function Home() {
  return (
    <div className='' >
        {/* <Hero /> */}
        <Dustbin />
        <div className="flex gap-4">
          <Box name="pan" />
          <Box name="book" />
          <Box name="keyboard" />

        </div>
    </div>
  )
}

export default Home