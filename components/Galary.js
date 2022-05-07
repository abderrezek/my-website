import { useEffect } from "react";
import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const galleryID = "gallery--responsive-images";

const Galary = ({ images }) => {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryID}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <>
      <div className="flex-root">
        <div
          className="flex flex-wrap items-stretch justify-center -m-2 pswp-gallery"
          id={galleryID}
        >
          {images.map((img, i) => (
            <a
              key={`${galleryID}-${i}`}
              href="#"
              className="m-2"
              data-pswp-src={`/img/${img.src}`}
              data-pswp-width={"700"}
              data-pswp-height={"500"}
              data-cropped="true"
              target="_blank"
              // rel="noreferrer"
            >
              <Image
                className="rounded"
                src={`/img/${img.src}`}
                alt={img.src}
                width="400"
                height="200"
                placeholder="blur"
                blurDataURL={`/img/${img.src}`}
                priority
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Galary;
