import React, {useState, useEffect} from 'react'

function ItemsList({getItems}){
    const [items, setItems] = useState([])

    useEffect(()=>{
        const newItems = getItems(42)
        setItems(newItems)
    }, [getItems])

    return(
        <ul>
            {items.map(i => <li key={i}>{i}</li>)}
        </ul> 
    )
}

export default ItemsList