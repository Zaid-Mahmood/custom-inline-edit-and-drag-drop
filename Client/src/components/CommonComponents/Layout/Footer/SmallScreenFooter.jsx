import { footerLinks } from "./FooterUtils";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
const SmallScreenFooter = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleId, setToggleId] = useState(null);
  const toggleFunc = (id) => {
    setToggle(true)
    setToggleId(id)
  }
  return (
    <div className="flex justify-center gap-4 md:gap-12 flex-wrap pt-12">
      {footerLinks.map((item, id) => {
        const footerData = footerLinks.length - 1;
        if (footerData === id) {
          return (
            <div className="text-center" key={id}>
              <p className="text-btnBg uppercase font-medium">{item.heading}</p>

              {/* Render text links */}
              {item?.links?.map((linkItem, idx) => (
                <div key={idx}>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[50%] mx-auto">
                    {linkItem.name}
                  </p>
                </div>
              ))}
              {/* Render inputs and buttons only if they exist */}
              <div className="flex gap-2">
                {item.inputs?.map((input, inputId) => (
                  <div className="w-[20%] md:w-[30%]" key={inputId}>
                    <label className="text-sm text-gray-500 bg-Btnbg h-full">
                      {input.inputLabel}*
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 items-start w-[80%]">
                {item.inputs?.map((input, inputId) => (
                  <div key={inputId}>
                    <input
                      className="w-[100%] md:w-full h-8 border-[#CFF1FF] bg-[#CFF1FF]"
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
                      className="bg-btnBg font-medium rounded-full hover:bg-primary px-5 py-3 text-white uppercase">
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
              <h2 className="uppercase text-btnBg font-medium  text-xs md:text-md">{item.heading}</h2>
              <div className="p-2 bg-gray-200 w-fit text-lg">
                <GiHamburgerMenu onClick={() => toggleFunc(id)} />
                {(id === toggleId && toggle) &&
                  (item.links?.map((item, id) => {
                    return (
                      <ul key={id}>
                        <li>{item.name}</li>
                      </ul>
                    )
                  }
                  ))
                }
              </div>
            </div>

          )
        }
      }
      )}
    </div>
  )
}

export default SmallScreenFooter
