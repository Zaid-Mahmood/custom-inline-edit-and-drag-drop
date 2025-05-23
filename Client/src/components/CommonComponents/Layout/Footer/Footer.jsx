import { footerIcons, footerLinks } from "./FooterUtils";
import footerBg from '../../../../assets/natural-calm/footer-imgs/1.jpg';
const Footer = () => {
  const btnText = "Submit";
  return (
    <div>
      <div className="flex justify-center items-center gap-x-8 bg-primary w-full h-16">
        {footerIcons.map(({ icon: Icon }, id) => (
          <Icon className="text-white text-2xl" key={id} />
        ))}
      </div>
      <div className="relative h-100">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${footerBg})` }}
        ></div>

        <div className="relative h-full flex justify-around items-start gap-x-12">
          {footerLinks.map((item, id) => (
            <div className="pt-[12.5%]" key={id}>
              <p className="text-btnBg uppercase font-medium">{item.heading}</p>
              {item?.links?.map((linkItem, idx) => {
                const isLast = footerLinks.length - 1;
                return (
                  <>
                    <p
                      key={idx}
                      className={`text-gray-500 text-sm leading-relaxed ${isLast ? 'w-[80%]' : ''}`}
                    >
                      {linkItem.name}
                    </p>
                    <div className="flex">
                      {item.inputs?.map((item, id) => (
                        <>
                          <div key={id}>
                            <label className="text-sm text-gray-500">{item.inputType}*</label>
                            <br></br>
                            <input className="w-[100%] border-2 border-[#CFF1FF] bg-[#CFF1FF]" type={item.type} />
                       
                          </div>
                          &nbsp;
                        </>
                      ))}
                         
                    </div>
                  </>
                );
              })}

            </div>
          ))}
             
        </div>

        <div className="flex justify-center items-center gap-x-8 bg-primary w-full h-16">
          <p className="text-white text-[11px] tracking-[6px]">© 2022 NATURAL CALM CANADA – ALL RIGHTS RESERVED. </p>
        </div>
      </div>

    </div>
  )
}

export default Footer
