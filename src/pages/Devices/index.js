import React from 'react'
import './style.css'
import {Button} from '../../components'
import httpRequest from '../../utils/httpRequest'
import {logout, isLoggedIn} from '../../utils/utils'
import  {SERVER_URL, POLLING_TIME, USER_INFO} from '../../constants'

const Devices = ({history}) =>{
    /***Local state ***/
    const [devices, setDevices] = React.useState([])

     /*** hook to check logged in use***/
    React.useEffect(()=>{
        if(isLoggedIn()){
            fetchDevices()
        } else {
            history.push('/')
        }
    },[history])
    /*** hook to polling online user every 5 second***/
    React.useEffect(()=>{
        
        let polling =setInterval(fetchDevices,POLLING_TIME)
        return ()=>{
            clearInterval(polling);
          }
    },[])

    /***fetchDevices details from server ***/
    const fetchDevices=()=>{
        httpRequest({url:`${SERVER_URL}/devices`}).then(response=>{
            if(Array.isArray(response.data.devices)){
                setDevices(response.data.devices)
            }
        }).catch(error=>{
            console.error(error);
        })
    }
    
    /***Notify button handler ***/
    const notifyHandler = () =>{
        const data = USER_INFO
        httpRequest({method:'post', url:`${SERVER_URL}/notify`, data}).then(response=>{
            alert("Notified successfully")
        }).catch(error=>{
            console.error(error);
        })
    }

     /***Logout button handler ***/
    const logoutHandler = () =>{
        logout()
        history.push('/')
    }
    /***Dynamic style of circle ***/
    const getStyle = (index)=>{
        const postion = 360 / (devices.length);
        const rotation = 'rotate(' + index *postion + 'deg)';
        return { transform: rotation };
    }
    return (<div className="devices__wrapper">
                <div className="position__center text-center text-white">
                    <div className="heading">{devices.length}</div>
                    <p>devices online</p>
                </div>
                <div className="circle__wrapper animate-rotate">
                    {devices.map(device => {
                    return (
                        <div key={device.id} className="circle-dot" style={getStyle(device.id)}>
                            <span className="circle" />
                        </div>
                    );
                    })}
                </div>
                <footer>
                    <Button label="NOTIFY" onClick={notifyHandler} className="btn-success marginRight-16"/>
                    <Button label="LOG OUT" onClick={logoutHandler} className="btn-secondary"/>
                </footer>
            </div>)
}

export default Devices