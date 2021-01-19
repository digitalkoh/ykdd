import React, { useContext, useState } from 'react'

const QueryContext= React.createContext()

export function useQuery() {
    return useContext(QueryContext)
}

export function QueryProvider({ children }) {
    const [query, setQuery] = useState('')
    const [queryInTitle, setQueryInTitle] = useState(false)
    const [queryInLyric, setQueryInLyric] = useState(false)

    function changeQuery(val) {
        setQuery(val)
    }
    function forQueryInTitle(val) {
        setQueryInTitle(val)
    }
    function forQueryInLyric(val) {
        setQueryInLyric(val)
    }
    return (
        <QueryContext.Provider value={{ query, queryInTitle, queryInLyric, changeQuery, forQueryInTitle, forQueryInLyric }}>
            {children}
        </QueryContext.Provider>
    )
}
