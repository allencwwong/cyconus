import { useState } from "react"
import Carousel from "react-bootstrap/Carousel";
import './Carousel.scss'

const BsCarousel = ({imgUrls}) => {
    const [index, setIndex] = useState(0);
    let imgSlides = []

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const setSlides = () =>{
        imgUrls.forEach(imgUrl =>{
            if(imgUrl){
                imgSlides.push(
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={imgUrl}
                        alt="First slide"
                        />
                    </Carousel.Item>
                )
            }
        })
    }

    setSlides()


  return (
    <Carousel interval={null} controls={false} indicators={imgSlides.length > 1 ? true : false} activeIndex={index} onSelect={handleSelect}>
        {imgSlides}
    </Carousel>
  );
};

export default BsCarousel