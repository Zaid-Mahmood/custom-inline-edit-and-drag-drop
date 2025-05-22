import { ShopListsUtils } from "./ShopListsUtils";
const ShopLists = () => {
    const btnText = "Shop here";
    return (
        <div className="grid grid-cols-4 mb-24 max-w-[90%] mx-auto gap-4">
            {ShopListsUtils.map((item, id) => {
                return (
                    <div className="flex flex-col justify-between" key={id}>
                        <div>
                            <h2 className="text-btnBg text-2xl">{item.shopHeading}</h2>
                            <p className="text-gray-500">{item.shopSubtitle}</p>
                            <img className="w-50 h-50 object-contain mx-auto my-4" src={item.img} alt="img-item" />
                            <p className="text-gray-500 text-center">{item.shopText}</p>
                        </div>
                        <button className="w-40 mx-auto text-white hover:bg-primary cursor-pointer bg-btnBg py-3 px-6 rounded-full my-4 uppercase font-bold">{btnText}</button>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default ShopLists
