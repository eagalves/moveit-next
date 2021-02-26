import { CompletedChallenges } from "../componentes/completedChallenges"
import { Countdown } from "../componentes/Countdown"
import { ExperienceBar } from "../componentes/Experiencebar"
import Head from 'next/head'
import { Profile } from "../componentes/Profile"
import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from "../componentes/ChallengeBox"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown/>
        </div>
        <div>
          <ChallengeBox/>
        </div>
      </section>

    </div>
  )
}