import { ShopListsUtils } from "./ShopListsUtils";
const ShopLists = () => {
    const btnText = "Shop here";
    return (
        <div className="grid grid-cols-4 mb-24 mx-24 gap-5">
            {ShopListsUtils.map((item, id) => {
                return (
                    <div className="text-center" key={id}>
                        <h2 className="text-btnBg min-h-15 text-2xl">{item.shopHeading}</h2>
                        <p className="text-gray-500">{item.shopSubtitle}</p>
                        <img className="w-50 h-50 object-contain mx-auto my-4" src={item.img} alt="img-item" />
                        <p className="text-gray-500 min-h-24">{item.shopText}</p>
                        <button className="text-white hover:bg-primary cursor-pointer bg-btnBg py-3 px-6 rounded-full my-4 uppercase font-bold">{btnText}</button>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default ShopLists
