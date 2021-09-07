import {useCallback} from 'react';
import debounce from 'lodash.debounce';
import './SearchBar.css';

const SearchBar = (props) => {

  const {data, setFilteredData} = props

  const changeHandler = (e, data) => {
    if(e.target.value === '') {
      setFilteredData(data.slice(0, 25))
    } else {
      let newData = data.filter(item => {
        return item.pid.includes(e.target.value) || item.brand.includes(e.target.value)
      })
      newData = newData.slice(0, 25)
      setFilteredData(newData)
    }
  }

  const handleClearClick = () => {
    document.getElementById('product-search').value = ""
    setFilteredData(data.slice(0, 25))
  }

  const debouncedChangeHandler = useCallback(
    debounce((e) => {changeHandler(e, data)}, 300)
  ,[data])


  return (
    <div className="search">
      <label htmlFor="product-search" >Search</label>
      <input id="product-search" type="text" onChange={debouncedChangeHandler} />
      <button onClick={handleClearClick} className="clear-btn">Clear</button>
    </div>
  )
}

export default SearchBar;