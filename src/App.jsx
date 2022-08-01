import React from "react"
import Alert from "./Alert"



function App() {

  const [groceries , setGroceries] = React.useState([])
  const [itemValue, setItemValue] = React.useState()
  const [itemQuantity, setItemQuantity] = React.useState()
  const [editing , setEditing] = React.useState(false)
  const [editedItemIndex, setEditedItemIndex] = React.useState()
  const [alert, setAlert] = React.useState({show: false, action: null})
  

  const handleSubmit = (e)=>{
    e.preventDefault()

    if (! editing){
      // in case the user is adding values to the list
      let newElement = {
        name: itemValue,
        quantity: itemQuantity
      }

      setGroceries(oldValue => [...oldValue, newElement])

      showAlert(true, "adding")
      // display the alert message of adding    
  
    }
    else{
      // in case the user is editing his choice 

      setItemValue(groceries[editedItemIndex].name)
      setItemQuantity(groceries[editedItemIndex].quantity)

      let editedElement = {
        name: itemValue,
        quantity: itemQuantity
      }

      setGroceries( oldValue => oldValue.map( item=>{
        return groceries.indexOf(item) === editedItemIndex ? editedElement : item
      }))
      setEditing(false)
      setEditedItemIndex()
      // comeback to the initial state of editing
      showAlert(true, "editing")
      // display the alert message of editing
    }

  }

  const handleChange = (e)=>{
    if(e.target.name === "groceryName"){
      setItemValue(e.target.value)
    } else{
      setItemQuantity(e.target.value)
    }
  }

  const editItem = (i) =>{
    setEditedItemIndex(i)
    setEditing(true)

    // toggle the editing state along with the appropriate index to change values
  } 
  
  const removeItem = (i) =>{
    let newGroceries = groceries
    newGroceries = newGroceries.filter(item => i !== newGroceries.indexOf(item))

    setGroceries(newGroceries)
    showAlert(true, "removing")
    // display the alert message of removing
  } 

  const showAlert = (state= false, action = null) => {
    setAlert({show: state, action: action})
    // default valued to be used in the Alert component when we call the function in order to unshow the Alert
  }

  const items = groceries.map( (item, index) => {
    return(
      <tr key={index} className={ index === editedItemIndex ? "edited"  : null}>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td className="td-icons">
          <i className="fa-solid fa-pen-to-square"  onClick={() => editItem(index)}></i>
          <i className="fa-solid fa-xmark"  onClick={() => removeItem(index)}></i>
        </td>
      </tr>
    )
  })

  return(
    <div className="container">
      {alert.show && <Alert list={groceries} action={alert.action} removeAlert={showAlert}/>}
      <h3>Groceries Store</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-left">
            <label> 
            Item :  <input 
                  type="text"
                  placeholder="e.g Eggs"
                  name="groceryName"
                  value={itemValue}
                  onChange={handleChange}
                  required
                  />
            </label>
            <label> 
            Quantity :  <input
                  type="number"
                  name="groceryQuantity"
                  value={itemQuantity}
                  placeholder="Quantity"
                  onChange={handleChange}
                  min={0} 
                  className="input-num"
                  required
                  />
            </label>
          </div>
          <button className="form-btn">{editing ? "edit" : "add"}</button>
        </form>
        <table className="table">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Modify</th>
          </tr>
          {items}
        </table>
    </div>
  )
}

export default App
