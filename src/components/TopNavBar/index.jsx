import { useState } from 'react'
import SearchBar from '../SearchBar'
import './index.scss'

const TopNavBar = () =>{
    const [searchText, setSearchText] = useState("")
    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }
    return(
        <div id='top-nav-wrapper'>
            <div id='search-bar-wrapper'>
                <SearchBar value={searchText} onChange={handleSearchChange}/>
            </div>
        </div>
    )
}

export default TopNavBar