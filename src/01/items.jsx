import { useEffect, useState } from "react"
import { api } from "./api"

const ItemsPage = () => {
    const [items, setItems] = useState([])
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState(null)

    useEffect(() => {
        setStatus('loading')
        setError(null)
        api.loadItems().then((res) => {

        }).catch(err => {
            setError(err)
        }).finally(() => setStatus('idle'))

    }, [])

    const deleteItem = (id) => {
        setStatus('loading')
        api.deleteItem(id).then((res) => {
            setItems(items.filter(i => i.id !== id))
        }).catch(err => {
            setError(err)
        }).finally(() => setStatus('idle'))
    }

    return <div>
        {(status === 'loading') && <span>Loading...</span>}
        {!!error && <span>{error.toString()}</span>}
        <ul> {
            items.map(i => {
                return <Item item={i}
                    deleteItem={deleteItem}
                    key={i.id} />
            })}
        </ul>
    </div>

}

const Item = (props) => <li>
    {props.item.title}
    <button onClick={() => { props.deleteItem(props.item.id) }} >X</button>
</li>