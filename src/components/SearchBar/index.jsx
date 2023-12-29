import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar(props) {
    return(
        <div className='search-wrapper'>
        <input 
            id='input-search'
            value={props.value}
            onChange={(e) => {
              props.onChange(e);
            }}
            placeholder='Search'
            type='text'
        />
        <FontAwesomeIcon className="front-icon" icon={faSearch} /> 
        </div>
    )
}

export default SearchBar;