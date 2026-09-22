import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/database'

const rawBaseQuery = fetchBaseQuery({ baseUrl: base_url })

// Firebase Realtime Database's REST API checks the security rules'
// `auth` variable from an `?auth=<idToken>` query param, not a header.
// The demo/guest session never has a real Firebase idToken, so it's
// left unauthenticated on purpose: guests are meant to be rejected by
// rules that require `auth != null` (see database.rules.json).
export const authenticatedBaseQuery = (args, api, extraOptions) => {
    const idToken = api.getState().authReducer.value.token
    const adjustedArgs = typeof args === 'string' ? { url: args } : { ...args }

    if (idToken && idToken !== 'demo') {
        const separator = adjustedArgs.url.includes('?') ? '&' : '?'
        adjustedArgs.url = `${adjustedArgs.url}${separator}auth=${idToken}`
    }

    return rawBaseQuery(adjustedArgs, api, extraOptions)
}
