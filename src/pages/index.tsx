import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { CompletedChallenges } from "../componentes/completedChallenges"
import { Countdown } from "../componentes/Countdown"
import { ExperienceBar } from "../componentes/Experiencebar"
import { Profile } from "../componentes/Profile"
import { ChallengeBox } from "../componentes/ChallengeBox"
import styles from '../styles/pages/Home.module.css'


export default function Home(props) {
  console.log(props)
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
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => { // next surgiu desta função
  //chamada api

  const {
    level,
    currentExperience,
    challengesCompleted,
  } = ctx.req.cookies;


  return {
    props: {
      level,
      currentExperience,
      challengesCompleted,
    }
  }
}
//Back-end(ruby-Servidor)
//Next.js(Node.js-Servidor) Quais dados são repassados deste servidor para o Front-end(React-Cliente)
//Front-end(React-Cliente)