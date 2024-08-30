function Spinner({quantity}){
    return (
        <div className="flex">
            <button className="mx-2 bg-black text-white w-[25px] inline-block rounded font-bold">-</button>
            <p>{quantity}</p>
            <button className="mx-2 bg-black text-white w-[25px] inline-block rounded font-bold">+</button>
        </div>
    )
}

export default Spinner