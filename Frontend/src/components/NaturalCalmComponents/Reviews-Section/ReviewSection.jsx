import { ReviewUtils } from "./ReviewUtils";
const ReviewSection = () => {

  return (
    <>
      <div className="grid grid-cols-4 gap-8 max-w-[94%] mx-auto">
        {ReviewUtils.map((item) => {
          const firstLink = item?.link?.[0]?.webLink || "#";
          let link = firstLink;
          const reviewParagraph = item.reviewText.replace(/\n/g, "<br><br>")
            .replace(/<span>(.*?)<\/span>/g, (_, spanText) => {
              if (item?.link?.length > 0) {
                const foundLink = item.link.find((linkObj) => {
                  if (linkObj.text === spanText) {
                    return linkObj.webLink
                  }
                });
                if (foundLink?.webLink) {
                  link = foundLink.webLink;
                }
              }
              return `<a href="${link}" target="_blank" class="text-primary">${spanText}</a>`;
            });
          return (
            <div key={item.id}>
              <img src={item.img} alt="review-img" />
              <h2 className="my-4 text-gray-500 font-medium text-2xl">{item.reviewHeading}</h2>
              <p className="text-gray-500 font-[400] text-lg" dangerouslySetInnerHTML={{ __html: reviewParagraph }}></p>
              <p className="text-gray-500 my-4">{item.reviewAuthor}</p>
            </div>
          )
        })}
      </div>
      <div className="text-center my-4">
        <button className="bg-btnBg hover:bg-primary text-white py-4 px-8 rounded-full uppercase font-medium">See more reviews</button>
      </div>

    </>
  )
}

export default ReviewSection
