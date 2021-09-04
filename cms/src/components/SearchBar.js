import {useState, useCallback} from 'react';
import debounce from 'lodash.debounce';
import './SearchBar.css';

const SearchBar = (props) => {
  const [pageNum, setPageNum] = useState(1)
  const [productNum, setProductNum] = useState(1)
  const {data, setFilteredData} = props
  let totalPages = Math.ceil(data.length / 25)

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

  const debouncedChangeHandler = useCallback(
    debounce((e) => {changeHandler(e, data)}, 300)
  ,[data])

  const handleBackClick = () => {
    if(pageNum > 1) {
      setPageNum(pageNum-1)
      let newData = [...data]
      newData = newData.slice(productNum-26, productNum)
      setFilteredData(newData)
      setProductNum(productNum-25)
    }
  }

  const handleNextClick = () => {
    if(pageNum < totalPages) {
      setPageNum(pageNum+1)
      let newData = [...data]
      let lastIdx = (productNum + 50 < data.length) ? productNum + 50 : data.length
      setProductNum(productNum+25)
      newData = newData.slice(productNum+24, lastIdx + 1)
      setFilteredData(newData)
    }
  }

  return (
    <div className="search">
      <label htmlFor="product-search" >Search</label>
      <input id="product-search" type="text" onChange={debouncedChangeHandler} />
      <button className="clear-btn">Clear</button>
      <div className="pagination btn-group-plain">
        <p>{`${pageNum} of ${totalPages}`}</p>
        <button onClick={handleBackClick} className="prev-btn">&laquo;</button>
        <p>{`${productNum}-${productNum+24 > data.length ? data.length : productNum+24} of ${data.length}`}</p>
        <button onClick={handleNextClick} className="next-btn">&raquo;</button>
      </div>
    </div>
  )
}

export default SearchBar;