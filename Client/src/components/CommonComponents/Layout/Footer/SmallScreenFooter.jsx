import { footerLinks } from "./FooterUtils";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const SmallScreenFooter = () => {
  const [toggleId, setToggleId] = useState([]);

  const openToggleFunc = (id) => {
    setToggleId((prev) => [...prev, id]);
  }

  const closeToggleFunc = (id) => {
    setToggleId((prev) => prev.filter((item) => item !== id))
  }

  return (
    <div className="flex justify-center gap-4 md:gap-12 flex-wrap pt-12">
      {footerLinks.map((item, id) => {
        const footerData = footerLinks.length - 1;
        if (footerData === id) {
          return (
            <div className="text-center" key={id}>
              <p className="text-btnBg uppercase font-medium">{item.heading}</p>

              {item?.links?.map((linkItem, idx) => (
                <div key={idx}>
                  <p className="text-gray-500 text-xs max-w-[80%] sm:text-sm leading-relaxed  sm:max-w-[50%] mx-auto">
                    {linkItem.name}
                  </p>
                </div>
              ))}
              <div className="flex gap-2">
                {item.inputs?.map((input, inputId) => (
                  <div className="w-[20%] md:w-[30%]" key={inputId}>
                    <label className="text-xs sm:text-sm text-gray-500 bg-Btnbg h-full">
                      {input.inputLabel}*
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 items-start w-[80%]">
                {item.inputs?.map((input, inputId) => (
                  <div key={inputId}>
                    <input
                      className="w-full md:w-full h-4 md:h-8 border-[#CFF1FF] bg-[#CFF1FF]"
                      type={input.type}
                      key={inputId}
                    />
                    &nbsp; &nbsp;
                  </div>
                ))}
                <div>
                  {item.btnData?.map((btn, btnId) => (
                    <button
                      key={btnId}
                      type={btn.btnType}
                      className="bg-btnBg font-medium rounded-full hover:bg-primary md:text-md text-xs px-3 py-1.5 sm:px-5 sm:py-3 text-white uppercase">
                      {btn.btnText}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={id}>
              <h2 className="uppercase text-btnBg font-medium text-[6px] sm:text-xs md:text-md">{item.heading}</h2>
              <div>

                {toggleId.find((item) => item === id + 1)
                  ?
                  <>
                    <IoMdClose className="p-1 bg-gray-200 w-fit text-2xl" onClick={() => closeToggleFunc(id + 1)} />
                    {
                      (item.links?.map((item, id) => {
                        return (
                          <ul key={id}>
                            <li className="text-primary p-2 text-[8px] md:text-xs bg-white">{item.name}</li>
                          </ul>
                        )
                      }
                      ))
                    }
                  </>
                  :
                  <GiHamburgerMenu className="p-1 bg-gray-200 w-fit text-2xl" onClick={() => openToggleFunc(id + 1)} />
                }
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default SmallScreenFooter
