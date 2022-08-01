import React from 'react'

function Alert(props) {
    let comment;

    if(props.action === "adding"){
        comment="Added"
    } else if(props.action === "editing"){
        comment="Edited"
    } else if(props.action === "removing"){
        comment="Removed"
    }
    // display the correct comment 


    React.useEffect(()=>{
        const timeout = setTimeout(()=>{
            props.removeAlert()
        }, 2000)

        return ()=> clearTimeout(timeout)
    },[props.list])

    // the effect hook was used to help display the alert only once 
    // setTimeout takes a function and a time delay to run the function 
    // removeAlert calls the showAlert with the default values (i.e show=false) which shut off the alert
    // clearTimeout takes the id of the setTimeout function used (in this case we've saved that id in the timeout variable)

  return (
     <div className={props.action}>Item {comment} Successfully</div>
  )
}

export default Alert