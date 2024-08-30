import Spinner from "./Spinner"

function CardHorizontal(props){
    return (
        <div className="flex min-h-5 border rounded p-3">
            <div className="w-8 h-8 flex justify-center items-center mx-2">
                <img src="/berawan.png" />
            </div>
            <div className="w-full flex justify-between items-center">
                <div>
                    <p>{props.businessunitproductname}</p>
                    <p className="font-bold">{`Rp${props.businessunitproductprice}`}</p>
                </div>
                <div className="">
                    <Spinner
                        quantity={props.quantity}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardHorizontal