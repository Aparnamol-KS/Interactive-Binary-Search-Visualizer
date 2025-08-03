import { useState } from 'react'
function App() {
  const [mid, setMid] = useState('')
  const [low, setLow] = useState('')
  const [end, setEnd] = useState('')
  const [ans, setAns] = useState('')
  const [search, setSearch] = useState(false)
  const [target, setTarget] = useState('')
  const [userArray, setUserArray] = useState('')
  const [a, setA] = useState(Array.from({ length: 22 }, (_, i) => i + 1))


  const getColor = (index) => {
    if (!search) return 'white'
    if (index === mid) return 'green'
    if (index >= low && index <= end) return 'white'
    return 'grey'
  }

  const setArray = () => {
    if (userArray.trim() == '') {
      setA(Array.from({ length: 26 }, (_, i) => i + 1))
      setSearch(false)
      setAns('')
      setMid('')
      return
    }
    const got = userArray.split(',').map(num => Number(num.trim())).filter(num => !isNaN(num)).sort((a, b) => a - b)
    setA(got)
    setSearch(false)
    setAns('')
    setMid('')
  }



  async function performBinarySearch() {
    if (a.length === 0) {
      alert('Please enter and set a valid array first.');
      return;
    }
    setSearch(true)
    setMid('')
    setAns('')
    let x = Number(document.getElementById('target').value)
    let start = 0
    let end = a.length - 1
    setLow(start)
    setEnd(end)
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      setMid(mid)
      await delay(1500);
      if (a[mid] === x) {
        setAns('Found')
        return
      }
      else if (a[mid] < x) {
        start = mid + 1;
        setLow(start)
      }
      else {
        end = mid - 1;
        setEnd(end)
      }

    }
    setAns('Not found')
  }


  return (
    <div className="flex flex-col font-mono justify-around items-center bg-gray-900 h-screen text-white flex-wrap" >
      <div><h1 className='text-6xl font-semibold font-serif'>Binary Search</h1></div>
      <div className="flex px-18 font-mono flex-wrap text-black">
        {a.map((arr, index) =>
          <div key={index} className='w-15 h-7 text-center' style={{
            border: "1px solid black",
            backgroundColor: getColor(index)
          }}><p>{arr}</p></div>
        )}
      </div>
      <div className="flex items-center gap-60 mt-6">
        <div className="flex flex-col items-center gap-4 mt-6">
          <p className="text-lg font-semibold text-white">Enter the sorted array</p>
          <input type="text" id="array" value={userArray} onChange={(e) => setUserArray(e.target.value)}
            className="p-2 rounded-md border w-90 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            placeholder="e.g. 1,3,5,7,9" />

          <button
            onClick={setArray}
            className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition duration-300" >
            SET ARRAY
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 mt-6">
          <p className="text-lg font-semibold text-white">Enter the number to search</p>
          <input type="number" id="target" value={target} onChange={(e) => setTarget(e.target.value)}
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            placeholder="Enter number" />
          <button
            onClick={performBinarySearch}
            className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition duration-300" >
            SUBMIT
          </button>
        </div>
      </div>



      <div className="mt-2 bg-gray-800 rounded-lg p-6 text-white shadow-md w-64 ">
        <h2 className="text-2xl font-bold mb-4 text-center">Results</h2>
        <p><span className="font-semibold">Start:</span> {low}</p>
        <p><span className="font-semibold">End:</span> {end}</p>
        <p><span className="font-semibold">Mid Index:</span> {mid}</p>
        <p>
          <span className="font-semibold">Result:</span>{' '}
          <span
            className={`font-bold text-xl ${ans === 'Found'
                ? 'text-green-400'
                : ans === 'Not found'
                  ? 'text-red-500'
                  : 'text-white'
              }`}
          >
            {ans}
          </span>
        </p>
      </div>
    </div>
  )
}

export default App
