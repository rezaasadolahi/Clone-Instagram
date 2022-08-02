import { useState, useRef, useEffect } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc"
//* CSS
import './Scss/DnD.scss'
import './Scss/SortableArray.scss'
//* Icon
import represent_media_black from './Icons/represent_media_black.svg'
import represent_media_blue from './Icons/represent_media_blue.svg'
import open_media_gallery from './Icons/open_media_gallery.svg'





//* Sortable Gallery
const SortableItem = SortableElement(({ value }) => {
  return <img
    style={{ zIndex: '150' }}
    src={URL.createObjectURL(value)}
    alt="This is gallery img"
    draggable={false}
    loading='lazy'
  />
})
const SortableList = SortableContainer(({ items }) => {
  return (
    <ol id='Li-Gallery' style={{ position: 'absolute', zIndex: '150' }}>
      {
        items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))
      }
    </ol>
  )
})






function DnD({ setGetImagePosts, emtyImagesPostModal }) {
  // drag state
  const [dragActive, setDragActive] = useState(false)
  const [getImages, setGetImages] = useState([])
  // Carousel state
  const [indexArr, setIndexArr] = useState(0)
  // Open Sortable Gallery
  const [sortableGallery, setSortableGallery] = useState(false)
  // ref
  const inputRef = useRef(null)

  // handle drag events
  const handleDrag = (event) => {
    event.preventDefault()
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true)
    } else if (event.type === "dragleave") {
      setDragActive(false)
    }
    console.clear()
  }

  // triggers when file is dropped
  const handleDrop = (event) => {
    event.preventDefault()
    setDragActive(false)
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setGetImages([...getImages, ...event.dataTransfer.files])
    }
    console.clear()
  }

  // triggers when file is selected with click
  const handleChange = (event) => {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      setGetImages([...getImages, ...event.target.files])
    }
  }

  // Sortable Gallery
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setGetImages(arrayMove(getImages, oldIndex, newIndex))
    console.clear()
  }

  // prop: Send image to Header component
  useEffect(() => {
    setGetImagePosts(getImages)
  }, [getImages, setGetImagePosts])

  useEffect(() => {
    return setGetImages(emtyImagesPostModal)
  }, [emtyImagesPostModal])












  return (
    <form id="form-file-upload" onSubmit={(event) => event.preventDefault()}>
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />

      <div
        id="label-file-upload"
        className={dragActive ? "drag-active" : ""}
        onDragEnter={(event) => handleDrag(event)}
        onDragOver={(event) => handleDrag(event)}
        onDragLeave={(event) => handleDrag(event)}
        onDrop={(event) => handleDrop(event)}
      >
        <section>
          {getImages.length !== 0 ?
            <section id='Carousel'>
              <IoIosArrowBack
                id='ArrowBack'
                style={{ display: getImages[0] === getImages[indexArr] ? 'none' : 'block' }}
                onClick={() => setIndexArr(indexArr - 1)}
              />
              <IoIosArrowForward
                id='ArrowForward'
                style={{ display: getImages[getImages.length - 1] === getImages[indexArr] ? 'none' : 'block' }}
                onClick={() => setIndexArr(indexArr + 1)}
              />

              <img
                src={URL.createObjectURL(getImages[indexArr])}
                alt="This is image that user upload"
                className="d-block"
                width='460'
                height='350'
                draggable='false'
                loading='lazy'
              />
            </section>
            :
            <>
              <img
                src={dragActive ? represent_media_blue : represent_media_black}
                alt="represent media"
                width='150'
                height='100'
                draggable={false}
                loading='lazy'
              />
              <p className='mt-1'>Drag photos and videos here</p>
              <button
                type='submit'
                className="btn btn-primary mt-5"
                onClick={() => inputRef.current.click()}
              >
                Upload a file
              </button>
            </>
          }
        </section>

        <section id='lengthMediaDot-and-openMediaGallery'>
          <ul>
            {getImages.length > 1 &&
              getImages?.map((item, index) =>
                <li key={index} className={index !== indexArr ? 'dot-length-black' : 'dot-length-blue'}></li>
              )
            }
          </ul>


          {/* //* Sortable list gallery */}

          {getImages.length > 0 &&
            <img
              src={open_media_gallery}
              alt="this is open media gallery"
              id='open_media_gallery'
              draggable={false}
              loading='lazy'
              onClick={() => {
                setSortableGallery(!sortableGallery)
                console.clear()
              }}
            />
          }

          {sortableGallery &&
            <SortableList
              axis="xy"
              items={getImages}
              onSortEnd={onSortEnd}
            />
          }

        </section>
      </div>
    </form>
  )
}

export default DnD