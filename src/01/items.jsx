import { useEffect } from "react"
import { deleteItemTC, loadItemsTC } from "../redux/redux"
import { api } from "./api"

const ItemsPage = () => {

    // стэйт из redux (альтернатива useState)
    const items = useSelector(state => state.data.items)
    const status = useSelector(state => state.data.status)
    const error = useSelector(state => state.data.error)

    // загрузка данных
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadItemsTC())
    }, [])

    return <div>
        {(status === 'loading') && <span>Loading...</span>}
        {!!error && <span>{error.toString()}</span>}
        <ul> {
            items.map(i => {
                return <Item item={i} key={i.id} />
            })}
        </ul>
    </div>

}

const Item = (props) => {
    const dispatch = useDispatch()

    const deleteItem = () => {
        dispatch(deleteItemTC(props.item.id))
    }

    return <li>
        {props.item.title}
        <button onClick={deleteItem} >X</button>
    </li>
}