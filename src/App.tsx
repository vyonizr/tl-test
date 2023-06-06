import { useState } from 'react'
import { saveToJSON } from './utils'
import defaultAvatar from './assets/default-avatar.png'

type TSimpleObject = {
  id: string
  name: string
}

type Score = {
  [key: string]: {
    [key: string]: number
  }
}

const SCORE_OPTIONS = Array.from(Array(10), (_, index) => index + 1)

const STUDENTS = Array.from(Array(10), (_, index) => ({
  id: `mahasiswa_${index + 1}`,
  name: `Mahasiswa ${index + 1}`,
}))

const SCORE_ASPECTS = Array.from(Array(4), (_, index) => ({
  id: `aspek_penilaian_${index + 1}`,
  name: `Aspek Penilaian ${index + 1}`,
}))

const DEFAULT_VALUE: Score = {}
SCORE_ASPECTS.forEach((scoreAspect) => {
  DEFAULT_VALUE[scoreAspect.id] = {}
  STUDENTS.forEach((student) => {
    DEFAULT_VALUE[scoreAspect.id][student.id] = 1
  })
})

function App() {
  const [scores, setScores] = useState<Score>(DEFAULT_VALUE)

  function handleOnChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    scoreAspect: TSimpleObject,
    student: TSimpleObject
  ) {
    setScores((prevState) => ({
      ...prevState,
      [scoreAspect.id]: {
        ...prevState[scoreAspect.id],
        [student.id]: Number(e.target.value),
      },
    }))
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      <table>
        <thead>
          <tr>
            <td></td>
            {SCORE_ASPECTS.map((scoreAspect) => (
              <td
                key={scoreAspect.id}
                style={{ textAlign: 'center', width: '7rem' }}
              >
                {scoreAspect.name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {STUDENTS.map((student) => (
            <tr key={student.id}>
              <td
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2rem 10rem',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <img src={defaultAvatar} alt={`avatar ${student.name}`} />
                <p>{student.name}</p>
              </td>
              {SCORE_ASPECTS.map((scoreAspect) => (
                <td key={scoreAspect.id}>
                  <select
                    name={scoreAspect.name}
                    id={scoreAspect.id}
                    onChange={(e) => handleOnChange(e, scoreAspect, student)}
                    style={{ width: '100%' }}
                  >
                    {SCORE_OPTIONS.map((scoreOption, index) => {
                      return (
                        <option key={index} value={scoreOption}>
                          {scoreOption}
                        </option>
                      )
                    })}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{
          alignSelf: 'end',
          padding: '0.5rem 1rem',
          backgroundColor: '#030712',
          color: 'white',
        }}
        onClick={() => saveToJSON(scores)}
      >
        Simpan
      </button>
    </main>
  )
}

export default App
