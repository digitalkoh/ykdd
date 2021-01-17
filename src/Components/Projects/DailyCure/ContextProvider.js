import React, { useContext, useState } from 'react'

const QueryContext= React.createContext()

export function useQuery() {
    return useContext(QueryContext)
}

export function QueryProvider({ children }) {
    const [query, setQuery] = useState('')

    function changeQuery(val) {
        setQuery(val)
    }
    return (
        <QueryContext.Provider value={{ query, changeQuery }}>
            {children}
        </QueryContext.Provider>
    )
}
