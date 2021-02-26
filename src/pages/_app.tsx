import React, { useState } from 'react'
import {CountdownProvider} from '../contexts/CountdownContext'
import { ChallengeContext, ChallengesProvider } from '../contexts/ChallengesContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {


  return (

    <ChallengesProvider>
      <CountdownProvider>
        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengesProvider>
  )
}

export default MyApp
