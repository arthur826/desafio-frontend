import './App.css'
import { ColaboradoresProvider } from './Contexts/ColaboradoresProvider'
import TableColaboradores from './Pages/ColaboradoresPage'

function App() {


  return (
    <>
      <ColaboradoresProvider>
        <TableColaboradores />
      </ColaboradoresProvider>
    </>
  )
}

export default App
