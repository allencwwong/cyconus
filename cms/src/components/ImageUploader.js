import {useEffect, useState, useRef} from 'react';
import './ImageUploader.css';

const ImageUploader = (props) => {
  const {formInputData,uploadedImages,setUploadedImages} = props;
  const [fileUrl, setFileUrl] = useState(null)
  const [fileUrl2, setFileUrl2] = useState(null)
  const [fileUrl3, setFileUrl3] = useState(null)
  const [fileUrl4, setFileUrl4] = useState(null)
  const [fileUrl5, setFileUrl5] = useState(null)
  const [formInputDataImgs, setFormInputDataImgs] = useState(null)
  const [activeUploadImg, setActiveUploadImg] = useState([])

  const updateActiveUploadImgState = (idx, isRemoveSet) =>{
    const copyState = [...activeUploadImg]
    isRemoveSet ? copyState[idx] = false : copyState[idx] = true
    setActiveUploadImg(copyState)
  }

  const toBeUploadImgView = (idx) => {
    const fileUrls = [fileUrl,fileUrl2,fileUrl3,fileUrl4,fileUrl5]
    return (
    <div>
      <input type="file" onChange={(event)=>handleChange(event,idx)}/>
      <img src={fileUrls[idx]?.file} alt={fileUrls[idx]?.file?.name}/>
    </div>
  )}

  const uploadedImgView = (imgData,idx) => (
    <div>
      <img src={imgData?.url} alt={imgData?.name} />
      <button onClick={()=>handleClickDelete(idx)}>delete</button>
    </div>
  )

  const uploadImgContainerView = (imgData,idx) => (
    <div key={imgData?.name || idx} className="img-upload active">
      {imgData ? uploadedImgView(imgData,idx) : toBeUploadImgView(idx) }
    </div>
  )

  const handleClickDelete = (idx) =>{
    const copyState = [...formInputDataImgs]
    copyState[idx] = ''
    setFormInputDataImgs(copyState)
    updateActiveUploadImgState(idx,true)
  }

  const handleChange = (event,idx) => {
    const copyUploadedImagesState = [...uploadedImages]
    copyUploadedImagesState[idx] = event.target.files[0]
    setUploadedImages(copyUploadedImagesState)
    const setFile = [setFileUrl,setFileUrl2,setFileUrl3,setFileUrl4,setFileUrl5]
    setFile[idx]({
      file: URL.createObjectURL(event.target.files[0])
    })
    updateActiveUploadImgState(idx)
  }

  useEffect(()=>{
    let imgsUrlData = []
    let defaultActiveUploadImg = [false,false,false,false,false];
    if(formInputData){
      const imgsUrlDataIdx = ['img','img2','img3','img4','img5']
      imgsUrlDataIdx.forEach((imgIdx,idx)=>{
        if(formInputData[imgIdx]){
          defaultActiveUploadImg[idx] = true
          imgsUrlData[idx] = {url: formInputData[imgIdx], name: `${formInputData.pid}-${formInputData.brand}-${idx}` }
        }
      })
    }
    setActiveUploadImg(defaultActiveUploadImg)
    setFormInputDataImgs(imgsUrlData)
  },[formInputData])

  console.log(activeUploadImg)

  return (
    <div>
      <h2>Image Management</h2>
      <div className="img-container">
        {/* check formInputData true render uploadImgView else render toBeUpload */}
        {activeUploadImg.map((upload,idx)=> uploadImgContainerView(formInputDataImgs[idx],idx))}
      </div>
    </div>
  )

}

export default ImageUploader;