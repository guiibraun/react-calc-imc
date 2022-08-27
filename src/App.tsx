import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import { calculateImc, Level, levels } from './helpers/imc'
import { GridItem } from './components/RightSide'
import leftArrowImage from './assets/leftarrow.png'



const App = () => {
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalculateButton = (e: React.FormEvent) => {
    e.preventDefault()
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField))
    } else {
      alert('Digite todos os campos')
    }
  }

  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }

  let disabledInputs = toShow ? true: false 

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={250}></img>
        </div>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC</h1>
            <p>IMC é a sigla para Índice de Massa Corpórea, parêmtro adotado pela ORganização Mundial de Saúde para calcular o peso ideal de cada pessoa</p>
            <form onSubmit={handleCalculateButton}>
              <div>
                <input type="number" placeholder="Digite a sua altura. Ex 1.5 (em metros)" value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(Number(e.target.value))} disabled={disabledInputs}></input>
              </div>
              <div>
                <input type="number" placeholder="Digite o seu peso. Ex 75.5 (em metros)" value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(Number(e.target.value))} disabled={disabledInputs}></input>
              </div>
              <div>
                <input type="submit" disabled={disabledInputs}></input>
              </div>
            </form>
          </div>
          <div className={styles.rightSide}>
            {!toShow && 
              <div className={styles.grid}>
                {levels.map((item, index) => (
                  <GridItem item={item} key={index}/>
                ))}
              </div>
            }
            {toShow &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} alt='' width={25}/>
                </div>
                <GridItem item={toShow}/>
              </div>
            } 
          </div>
        </div>
      </header>
    </div>
  )
}

export default App