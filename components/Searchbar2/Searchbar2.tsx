import { SearchIcon } from '@heroicons/react/outline'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Spinner } from '../System/Spinner'
import { SearchOverlayCard } from '../System/Searchbar/SearchOverlayCard'
import { useClickOutside } from '../../utils/hooks'
import { mailman } from '../../backend/utils/mailman'
import { SearchResultType } from '../../types'
import { StyledSearchbar2 } from '.'
import { Icon } from '../System'

type Props = {
  placeholder?: string
}

const Searchbar: FC<Props> = ({ placeholder }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResultType[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef(null)
  useClickOutside(wrapperRef, () => setIsFocused(false))

  useEffect(() => {
    if (query) {
      setLoading(true)
    }

    const search = async () => {
      const { res } = await mailman(`search?q=${query}&count=6`)
      setResults(res)
      setLoading(false)
    }

    const throttle = setTimeout(() => {
      if (query) {
        search()
      }
      else {
        setResults([])
        setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(throttle)
    }
  }, [query])

  return (
    <StyledSearchbar2 isFocused={isFocused} ref={wrapperRef}>
      <div className="searchbarWrapper" onClick={() => setIsFocused(true)}>
        <Icon size={20} fill="var(--color2)">
          {loading ? <Spinner size={20} /> : <SearchIcon />}
        </Icon>
        <input 
          type="text" 
          placeholder={placeholder ? placeholder : 'Search players or maps'} 
          onChange={(e) => setQuery(e.currentTarget.value)} 
        />
      </div>

      {isFocused && <SearchOverlayCard results={results}/> }
    </StyledSearchbar2>
  )
}

export default Searchbar