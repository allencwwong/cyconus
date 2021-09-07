import {useState} from 'react';
import './Pagination.css';

const Pagination = (props) => {
  const {data, setFilteredData} = props;
  const [pageNum, setPageNum] = useState(1)
  const [productNum, setProductNum] = useState(1)
  let totalPages = Math.ceil(data.length / 25)

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
    <div className="pagination btn-group-plain">
        <p>{`${pageNum} of ${totalPages}`}</p>
        <button onClick={handleBackClick} className="prev-btn">&laquo;</button>
        <p>{`${productNum}-${productNum+24 > data.length ? data.length : productNum+24} of ${data.length}`}</p>
        <button onClick={handleNextClick} className="next-btn">&raquo;</button>
      </div>
  )
}

export default Pagination;