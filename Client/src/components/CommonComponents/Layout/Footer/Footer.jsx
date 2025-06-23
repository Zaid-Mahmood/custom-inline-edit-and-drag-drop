import { footerIcons, footerLinks } from "./FooterUtils";
import footerBg from '../../../../assets/natural-calm/footer-imgs/1.jpg';
import SmallScreenFooter from "./smallScreenFooter";
const Footer = () => {
  return (
    <>
      <div className="flex justify-center items-center gap-x-8 bg-primary w-full h-16">
        {footerIcons.map(({ icon: Icon }, id) => (
          <Icon className="text-white text-2xl" key={id} />
        ))}
      </div>
      <div className="relative h-100">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${footerBg})` }}
        ></div>
        <div className="relative h-full w-[85%] mx-auto">

          <div className="hidden lg:flex justify-center items-start gap-x-12">
            {footerLinks.map((item, id) => {
              const lastSection = footerLinks.length - 1;
              if (lastSection === id) {
                return (
                  <div className="pt-[12.5%]" key={id}>
                    <p className="text-btnBg uppercase font-medium">{item.heading}</p>
                    {item?.links?.map((linkItem, idx) => (
                      <div key={idx}>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {linkItem.name}
                        </p>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      {item.inputs?.map((input, inputId) => (
                        <div className="w-[38%] text-center" key={inputId}>
                          <label className="text-sm text-gray-500 bg-Btnbg h-full">
                            {input.inputLabel}*
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 items-start">
                      {item.inputs?.map((input, inputId) => (
                        <div className="w-[80%]" key={inputId}>
                          <input
                            className="h-8 border-[#CFF1FF] bg-[#CFF1FF]"
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
                  <div className="pt-[12.5%] mx-auto w-full" key={id}>
                    <p className="text-btnBg uppercase font-medium">{item.heading}</p>
                    {item?.links?.map((linkItem, idx) => (
                      <div key={idx}>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {linkItem.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )
              }
            })}
          </div>

          <div className="block lg:hidden">
            < SmallScreenFooter />
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-8 bg-primary w-full h-16">
          <p className="text-white text-[11px] tracking-[6px]">© 2022 NATURAL CALM CANADA – ALL RIGHTS RESERVED. </p>
        </div>
      </div>
    </>
  )
}

export default Footer
