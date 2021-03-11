import { useEffect, useState } from 'react'

function App() {
  const [dados, setDados] = useState()
  const [estagiarios, setEstagiarios] = useState([])
  const [list, setList] = useState([])
  const [estado, setEstado] = useState()
  const cores = ["#35404F", "#59323C", "#5BB12F", "#260126", "#CD1719", "#354458", "#5A6A62", "#9B539C", "#8C4646", "#588C73", "#354458", "#E19D29"]

  const getPlan = async () => {
    const content = await fetch(
      'https://spreadsheets.google.com/feeds/list/1AJt6VNVS0Qa4X3EP2KKcVJNpmrENHiYakFxx6u8bvQ8/oxlfih8/public/values?alt=json'
    )
    .then(
      (resp) => resp.json()
    )

    const { feed } = content
    const { entry } = feed
    
    setDados(content)
    setEstagiarios(entry)
    setList([ entry[0] ])
  }

  useEffect(
    () => {
      getPlan()
    },
    []
  )

  useEffect(
    () => {
      if (estagiarios.length !== list.length) {
        setTimeout(
          () => {
            setEstado(estagiarios[list.length])
            setList(old => {
              return [ ...old, estagiarios[list.length] ]
            })
          },
          2000
        )
      }
    },
    [list]
  )
  
  return (
    <>
      <div>Data: { estado && estado.gsx$data.$t }</div>
      <div>Vitor: { estado && estado.gsx$vitorrocha.$t }</div>
      <div>Guilherme: { estado && estado.gsx$guilhermeleal.$t }</div>
      <div>Hudson: { estado && estado.gsx$hudsonpedroso.$t }</div>
      <div>Joao: { estado && estado.gsx$joãocalado.$t }</div>

      Log:
      <table>
        <thead>
          <td>date</td>
          <td>vitor</td>
          <td>guilherme</td>
          <td>hudson</td>
          <td>joaocalado</td>
        </thead>
        <tbody>
          {
            list.map(
              (item, index) => (
                <tr key={'seila' + index}>
                  <td>{ item.gsx$data.$t }</td>
                  <td>{ item.gsx$vitorrocha.$t }</td>
                  <td>{ item.gsx$guilhermeleal.$t }</td>
                  <td>{ item.gsx$hudsonpedroso.$t }</td>
                  <td>{ item.gsx$joãocalado.$t }</td>
                </tr>
              )
            )
          }
        </tbody>
      </table>

      <div>DEBUG</div>
      <pre>
        { JSON.stringify(dados, null, 2) }
      </pre>
    </>
  );
}

export default App;
